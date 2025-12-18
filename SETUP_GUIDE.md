# MediFlow - Clinic Management System

## 🎉 Authentication System Setup Complete!

Your MediFlow frontend is now configured with a complete authentication system.

## 📦 Installation

Run these commands in the `client` folder:

```powershell
# Install all dependencies
npm install axios clsx tailwind-merge lucide-react react-hook-form zod @hookform/resolvers sonner js-cookie
npm install -D @types/js-cookie

# Initialize Shadcn/UI (accept defaults)
npx shadcn@latest init

# Add required Shadcn components
npx shadcn@latest add button input label card form toast sonner
```

## 🚀 Getting Started

1. Make sure your NestJS backend is running at `http://localhost:3000/api/v1`
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. Open http://localhost:3001 in your browser
4. You'll be redirected to `/login`

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx         # Login page with form validation
│   │   │   └── register/page.tsx      # Registration page
│   │   ├── dashboard/page.tsx         # Protected dashboard
│   │   ├── layout.tsx                 # Root layout with AuthProvider
│   │   ├── page.tsx                   # Home page (redirects)
│   │   └── globals.css
│   ├── components/
│   │   ├── layouts/
│   │   │   └── AuthLayout.tsx         # Auth pages layout
│   │   └── ui/                        # Shadcn UI components
│   ├── context/
│   │   └── AuthContext.tsx            # Global auth state management
│   ├── lib/
│   │   ├── api.ts                     # Axios instance with interceptors
│   │   └── utils.ts                   # Utility functions (cn, token management)
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   └── middleware.ts                  # Route protection middleware
```

## ✨ Features Implemented

### 1. **API Client Setup** (`src/lib/api.ts`)
- Axios instance configured with backend URL
- Request interceptor: Auto-attaches Bearer token
- Response interceptor: Handles 401 errors and redirects to login

### 2. **TypeScript Types** (`src/types/index.ts`)
- User interface
- LoginDto and RegisterDto
- LoginResponse and RegisterResponse
- ApiError interface

### 3. **Auth Context** (`src/context/AuthContext.tsx`)
- Global state management for user authentication
- Functions: `login()`, `register()`, `logout()`, `refreshUser()`
- Auto-fetches user profile on mount if token exists
- Shows success/error toasts using Sonner

### 4. **Token Management** (`src/lib/utils.ts`)
- Stores tokens in cookies (7-day expiry)
- Helper functions: `setAuthToken()`, `getAuthToken()`, `removeAuthToken()`

### 5. **Login Page** (`src/app/(auth)/login/page.tsx`)
- Professional form design with Shadcn UI
- React Hook Form + Zod validation
- Email and password fields with icons
- Loading states and error messages
- Link to register page

### 6. **Register Page** (`src/app/(auth)/register/page.tsx`)
- Complete registration form
- Fields: First name, Last name, Email, Password, Confirm Password
- Form validation with Zod
- Password confirmation matching
- Links to terms and privacy policy

### 7. **Dashboard** (`src/app/dashboard/page.tsx`)
- Protected route (requires authentication)
- Displays user information
- Logout functionality
- Professional header with branding

### 8. **Middleware** (`src/middleware.ts`)
- Protects dashboard routes
- Redirects authenticated users away from auth pages
- Redirects unauthenticated users to login

### 9. **Auth Layout** (`src/components/layouts/AuthLayout.tsx`)
- Beautiful gradient background (Teal/Blue medical theme)
- Centered card design
- MediFlow branding with Heart icon
- Responsive design

## 🎨 Design System

- **Color Palette**: Teal (#0D9488) and Blue accents
- **Typography**: Geist Sans (modern, clean)
- **Components**: Shadcn UI (accessible, customizable)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## 🔐 Authentication Flow

1. **User visits the app** → Redirected to `/login` if not authenticated
2. **User logs in** → Token stored in cookies → Redirected to `/dashboard`
3. **API requests** → Token automatically attached via interceptor
4. **401 Error** → Token removed → Redirected to `/login`
5. **User logs out** → Token removed → Redirected to `/login`

## 🧪 Testing the System

1. Go to http://localhost:3001/register
2. Create a new account with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
3. You should see a success toast and be redirected to `/dashboard`
4. Your user info will be displayed
5. Click "Logout" to test logout functionality

## 📝 API Endpoints Expected

Your NestJS backend should have these endpoints:

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get current user profile (requires token)

## 🔧 Customization

### Change API URL
Edit `src/lib/api.ts`:
```typescript
const api = axios.create({
  baseURL: "https://your-backend-url.com/api/v1",
});
```

### Change Token Expiry
Edit `src/lib/utils.ts`:
```typescript
export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 30 }); // 30 days
};
```

### Add More Fields to Registration
1. Update `RegisterDto` in `src/types/index.ts`
2. Add fields to `src/app/(auth)/register/page.tsx`
3. Update Zod schema

## 🎯 Next Steps

You can now build out:
- Patient management
- Appointment scheduling
- Medical records
- Billing system
- Staff management
- Analytics dashboard

## 🐛 Troubleshooting

**Issue**: "Cannot find module '@/...'""
- Run `npm install` to ensure all dependencies are installed
- Check that `tsconfig.json` has the path alias configured

**Issue**: CORS errors
- Ensure your NestJS backend has CORS enabled
- Check that the API URL in `src/lib/api.ts` is correct

**Issue**: Token not persisting
- Check browser cookies for `mediflow_token`
- Verify the cookie domain settings

## 🎉 You're All Set!

Your authentication system is production-ready. Run `npm run dev` and test it out!
