import { create } from 'zustand'

/**
 * Window Manager store (Phase 2).
 *
 * Holds the list of open windows and a monotonically-increasing
 * `highestZIndex`. Focusing a window bumps `highestZIndex` and stamps it onto
 * the target — that single integer is what makes "click a background window to
 * bring it forward" work without comparing/re-sorting the whole array.
 *
 * Per the spec's schema each window tracks: id, title, component, isMinimized,
 * zIndex. (isMaximized and free drag/resize arrive in later phases — kept out
 * here to avoid over-engineering.) `x`/`y` give each window a spawn position so
 * it can be rendered now; Phase 3 (react-rnd) will use these as drag defaults.
 *
 *   window = { id, title, component, isMinimized, zIndex, x, y }
 */
const useWindowStore = create((set, get) => ({
  windows: [],
  highestZIndex: 0,

  /**
   * Open a window, or focus it if it's already open (windows are unique by id).
   * `component` is the React element rendered inside the window body.
   */
  openWindow: ({
    id,
    title,
    component,
    width = 340,
    height = 240,
    x,
    y,
    bare = false,
  }) => {
    const existing = get().windows.find((w) => w.id === id)
    if (existing) {
      // Already open — un-minimize and bring to front instead of duplicating.
      set((state) => ({
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, isMinimized: false } : w,
        ),
      }))
      get().focusWindow(id)
      return
    }

    set((state) => {
      const zIndex = state.highestZIndex + 1
      // Cascade new windows so they don't stack perfectly on top of each other,
      // unless an explicit x/y was provided (e.g. a docked widget).
      const offset = (state.windows.length % 6) * 28
      return {
        highestZIndex: zIndex,
        windows: [
          ...state.windows,
          {
            id,
            title,
            component,
            isMinimized: false,
            zIndex,
            x: x ?? 96 + offset,
            y: y ?? 72 + offset,
            width,
            height,
            bare,
          },
        ],
      }
    })
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w,
      ),
    })),

  /**
   * Bring a window to the front: increment the shared counter and assign it.
   * Also un-minimizes, so taskbar buttons can use focus to restore.
   */
  focusWindow: (id) =>
    set((state) => {
      const zIndex = state.highestZIndex + 1
      return {
        highestZIndex: zIndex,
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex, isMinimized: false } : w,
        ),
      }
    }),
}))

export default useWindowStore
