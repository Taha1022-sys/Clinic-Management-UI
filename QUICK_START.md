# 🚀 Quick Start Commands

Run these commands in order from the `client` directory:

```powershell
# 1. Install dependencies
npm install axios clsx tailwind-merge lucide-react react-hook-form zod @hookform/resolvers sonner js-cookie
npm install -D @types/js-cookie

# 2. Initialize Shadcn/UI (press Enter to accept defaults)
npx shadcn@latest init

# 3. Add Shadcn components
npx shadcn@latest add button input label card form toast sonner

# 4. Start development server
npm run dev
```

Then open http://localhost:3001 in your browser!

## ✅ What You Get

- ✨ Complete authentication system (login, register, logout)
- 🔐 Token-based authentication with cookies
- 🎨 Beautiful UI with medical/clinic theme
- 🛡️ Protected routes with middleware
- 📱 Responsive design
- 🎯 Form validation with Zod
- 🔔 Toast notifications with Sonner
- 🚦 Loading states and error handling
- 📦 Clean, modular architecture

## 🧪 Test It

1. Go to `/register`
2. Create an account
3. You'll be redirected to `/dashboard`
4. Your token is stored in cookies
5. Try logging out and logging back in!
