# 💾 Retro OS Portfolio

An interactive, highly professional personal portfolio website engineered to replicate the authentic look, feel, and functionality of a classic Windows 95/98 operating system.

---

## 🌟 Overview

This project goes beyond a static webpage by offering a fully functional desktop simulation. Designed to demonstrate advanced React state management, fluid animations, and a strict adherence to complex UI/UX requirements, the portfolio allows users to explore projects and skills through an immersive, nostalgic interface.

## ✨ Key Features

* **Authentic Window Manager:** Fully draggable, resizable, and stackable windows utilizing accurate z-index tracking. Clicking a background window instantly brings it to the forefront.
* **Interactive MS-DOS Terminal:** A custom-built, functional command-line interface. Users can type commands like `help`, `skills`, or `macrobrain` to interactively fetch data and explore project details.
* **Boot Sequence Hook:** A simulated BIOS boot-up screen on initial load that prints system diagnostics and mounts portfolio data before fading into the main UI.
* **System Properties Dashboard:** A classic multi-tabbed dialog window acting as the "About Me" section, complete with system specs, uptime, and network links.
* **Responsive Mobile Strategy:** A dedicated mobile layout that intelligently disables the draggable desktop environment on viewports under 768px, snapping windows to full-screen native app views for optimal touch navigation.

## 🛠️ Tech Stack

* **Core:** React 19, Vite
* **Styling:** Tailwind CSS v4 (utilizing hard shadows and custom CSS for retro inset/outset borders)
* **State Management:** Zustand (for global window coordinates, active states, and z-index arrays)
* **Window Mechanics:** `react-rnd` (Drag and Drop / Resizing)
* **Animations:** Framer Motion

## 🚀 Local Development Setup

To run this project locally, ensure you have Node.js installed on your machine.

**1. Clone the repository:**

```bash
git clone https://github.com/ahmadyar076/retro-os-portfolio.git
cd retro-os-portfolio

```

**2. Install dependencies:**

```bash
npm install

```

**3. Start the Vite development server:**

```bash
npm run dev

```

**4. Open your browser:**
Navigate to `http://localhost:5173` to interact with the OS.

## 📂 Architecture & Data

The application is built with a modular component architecture. All dynamic content (projects, skills, and bio data) is strictly separated from the UI components.

* `src/components/os/` - Core system components (Desktop, Taskbar, Icons).
* `src/components/windows/` - Individual application views (Terminal, System Properties, Project Viewer).
* `src/store/` - Zustand global state configuration for the window manager.
* `src/data/` - JSON/JS structures containing all portfolio content.

## 👨‍💻 Author

**Ahmad Yar Tariq Durrani**

* Software Engineer
* **GitHub:** [@ahmadyar076](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fahmadyar076)
* **Email:** durraniahmadyar@gmail.com
