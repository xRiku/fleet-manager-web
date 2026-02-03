# 🚗 Fleet Manager

<p align="center">
  <strong>Modern fleet management for the digital age</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL">
</p>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚙 Vehicle Management
- Track vehicle details, maintenance history, and availability
- Real-time odometer readings and status updates
- Garage assignment and location tracking

</td>
<td width="50%">

### 🛣️ Trip Management
- Request and approve vehicle trips
- Track trip progress from start to finish
- Review and audit trip completion

</td>
</tr>
<tr>
<td width="50%">

### 🏢 Garage Management
- Organize vehicles by garage location
- Manage multiple storage facilities
- Quick overview of vehicle distribution

</td>
<td width="50%">

### 👥 User Management
- Role-based access control (Admin/Driver)
- Secure authentication with Better Auth
- Driver profiles and trip history

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Auth** | Better Auth |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fleet-manager.git
   cd fleet-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/fleet_manager
   BETTER_AUTH_SECRET=your-secret-key
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   (manager)  │  │    (auth)    │  │   (driver)   │      │
│  │  Admin Pages │  │  Login/Auth  │  │ Driver Pages │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
   ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
   │  Server   │   │  Better   │   │  Drizzle  │
   │  Actions  │   │   Auth    │   │    ORM    │
   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                  ┌──────▼──────┐
                  │  PostgreSQL │
                  │  Database   │
                  └─────────────┘
```

### Project Structure

```
src/
├── actions/          # Server actions for mutations
├── app/              # Next.js app router
│   ├── (auth)/       # Auth group (login)
│   ├── (manager)/    # Manager group (dashboard, vehicles, etc.)
│   ├── api/          # API routes
│   └── driver/       # Driver-specific pages
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── buttons/      # Button components
│   ├── cards/        # Card components
│   ├── dialogs/      # Dialog components
│   └── tables/       # Table components
├── db/               # Database schema and config
├── hooks/            # Custom React hooks
├── lib/              # Utilities and auth config
├── stores/           # Zustand state stores
└── types.ts          # Shared TypeScript types
```

---

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio |

---

## 🔐 Authentication

Fleet Manager uses Better Auth for secure authentication:

- **Session-based auth** with HTTP-only cookies
- **Role-based access control** (Admin, User, Driver)
- **Secure password hashing** with bcrypt
- **Middleware protection** for protected routes

---

## 🎨 Design System

Built with a cohesive design system using:

- **Primary Color**: Teal (#14b8a6) - Represents movement and efficiency
- **Neutral Palette**: Slate grays for professional appearance
- **Typography**: System fonts optimized for readability
- **Components**: shadcn/ui with custom theming
- **Icons**: Lucide React + Phosphor icons

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with 💙 for fleet management
</p>
