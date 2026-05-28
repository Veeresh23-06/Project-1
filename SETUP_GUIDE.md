# 🚀 FindIt - Complete Setup Guide

## Step-by-Step Installation

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Firebase Project Setup

#### A. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "FindIt-Campus"
4. Disable Google Analytics (optional)
5. Click "Create Project"

#### B. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (add support email)

#### C. Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Start in **production mode**
3. Choose location closest to your users
4. Click "Enable"

#### D. Setup Storage
1. Go to **Storage** → **Get Started**
2. Start in **production mode**
3. Click "Done"

#### E. Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click web icon (</>) to add web app
4. Register app name: "FindIt Web"
5. Copy the firebaseConfig object

### 3. Environment Configuration

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 4. Firestore Security Rules

In Firebase Console → Firestore Database → Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }
    
    // Items collection
    match /items/{itemId} {
      allow read: if true; // Anyone can browse items
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.userId 
                    || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow delete: if request.auth.uid == resource.data.userId 
                    || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Claims collection
    match /claims/{claimId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### 5. Storage Security Rules

In Firebase Console → Storage → Rules, paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /items/{itemId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024 // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
    
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024 // 2MB limit
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 6. Create Admin User

After signing up your first user, manually set them as admin:

1. Go to Firestore Database
2. Find `users` collection
3. Find your user document
4. Edit the `role` field to `"admin"`

### 7. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 8. Build for Production

```bash
npm run build
```

The build files will be in the `dist` folder.

## 📱 Optional: SMS Notifications (Twilio)

### Setup Twilio

1. Create account at [Twilio](https://www.twilio.com/)
2. Get Account SID and Auth Token
3. Get a Twilio phone number
4. Add to `.env`:

```env
VITE_SMS_SERVICE_SID=your_twilio_sid
VITE_SMS_AUTH_TOKEN=your_twilio_token
VITE_TWILIO_PHONE=+1234567890
```

## 🤖 Optional: AI Image Recognition

### Using Google Cloud Vision API

1. Enable Cloud Vision API in Google Cloud Console
2. Create API key
3. Add to `.env`:

```env
VITE_AI_VISION_API_KEY=your_google_vision_api_key
```

### Using Clarifai

1. Create account at [Clarifai](https://www.clarifai.com/)
2. Get API key
3. Add to `.env`:

```env
VITE_CLARIFAI_API_KEY=your_clarifai_api_key
```

## 🚀 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set public directory to `dist`
- Configure as single-page app: Yes
- Don't overwrite index.html

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

## 🔧 Troubleshooting

### Firebase Connection Issues
- Check if `.env` file exists and has correct values
- Verify Firebase project is active
- Check browser console for errors

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Check Node.js version (should be v18+)

### Authentication Not Working
- Verify Email/Password and Google auth are enabled in Firebase
- Check Firebase Auth domain in `.env`
- Clear browser cookies and try again

### Images Not Uploading
- Check Storage rules are set correctly
- Verify image size is under 5MB
- Check file format (only PNG, JPG, JPEG allowed)

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🎯 Next Steps

1. Customize the color scheme in `tailwind.config.js`
2. Add your campus locations in `src/config/categories.js`
3. Update contact information in Footer component
4. Add your logo to `public/logo.svg`
5. Test all features thoroughly
6. Deploy to production

## 💡 Tips

- Use Chrome DevTools for debugging
- Test on multiple devices and browsers
- Enable Firebase Analytics for insights
- Set up error monitoring (e.g., Sentry)
- Regular database backups
- Monitor Firebase usage and costs

## 🆘 Need Help?

- Check the README.md file
- Review Firebase documentation
- Check browser console for errors
- Create an issue in the repository

Good luck with your project! 🚀
