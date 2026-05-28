/**
 * Multilingual translations - English (en), Kannada (kn), Hindi (hi)
 */
export const translations = {
  en: {
    nav: {
      home: 'Home',
      browse: 'Browse Items',
      reportLost: 'Report Lost',
      reportFound: 'Report Found',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
      admin: 'Admin',
      logout: 'Logout',
    },
    home: {
      hero: {
        title: 'Lost Something?',
        subtitle: "We'll Help You Find It.",
        description: 'FindIt is a campus platform that helps students report, find and recover lost items inside the college campus.',
        reportLost: 'Report Lost Item',
        reportFound: 'Report Found Item',
      },
      search: {
        placeholder: 'Search for items...',
        button: 'Search',
        allCategories: 'All Categories',
        allLocations: 'All Locations',
        allStatus: 'All Status',
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Simple steps to get your lost items back',
        step1: { title: 'Report Lost/Found', description: 'Fill out a quick form to report your lost or found item.' },
        step2: { title: 'We Match', description: 'Our AI system matches lost items with found items automatically.' },
        step3: { title: 'Get Notified', description: 'Receive email and SMS notifications when a match is found.' },
        step4: { title: 'Claim & Recover', description: 'Contact the finder and recover your item using QR code verification.' },
      },
      recentItems: { title: 'Recently Added Items', viewAll: 'View All Items', noItems: 'No items found' },
      testimonials: { title: 'What Students Say', subtitle: 'Real stories from our campus community' },
    },
    auth: {
      login: {
        title: 'Welcome Back', subtitle: 'Login to your account',
        email: 'Email Address', phone: 'Phone Number', password: 'Password',
        remember: 'Remember me', forgot: 'Forgot Password?', button: 'Login',
        noAccount: "Don't have an account?", signupLink: 'Sign up',
        orContinue: 'Or continue with', google: 'Continue with Google',
      },
      signup: {
        title: 'Create Account', subtitle: 'Join our campus community',
        name: 'Full Name', email: 'Email Address', phone: 'Phone Number',
        password: 'Password', confirmPassword: 'Confirm Password', button: 'Sign Up',
        hasAccount: 'Already have an account?', loginLink: 'Login',
        terms: 'I agree to the Terms and Conditions',
      },
      forgotPassword: {
        title: 'Forgot Password', subtitle: 'Enter your email to reset password',
        email: 'Email Address', button: 'Send Reset Link', backToLogin: 'Back to Login',
      },
    },
    report: {
      lost: { title: 'Report Lost Item', subtitle: 'Provide details about your lost item' },
      found: { title: 'Report Found Item', subtitle: 'Provide details about the found item' },
      fields: {
        itemName: 'Item Name', itemNamePlaceholder: 'e.g. Black Wallet',
        category: 'Category', selectCategory: 'Select Category',
        date: 'Date Lost/Found', location: 'Location', selectLocation: 'Select Location',
        description: 'Description', descriptionPlaceholder: 'Describe the item in detail...',
        uploadImage: 'Upload Image', dragDrop: 'Click to upload or drag and drop',
        imageFormats: 'PNG, JPG, JPEG up to 5MB', contactInfo: 'Contact Information',
        phone: 'Phone Number', email: 'Email Address', submitButton: 'Submit Report',
      },
    },
    browse: {
      title: 'Browse Items', subtitle: 'Find your lost item or help someone find theirs',
      filters: 'Filters', clearAll: 'Clear All', categories: 'Categories',
      locations: 'Locations', status: 'Status', sort: 'Sort',
      sortNewest: 'Newest First', sortOldest: 'Oldest First',
      noResults: 'No items found', noResultsDesc: 'Try adjusting your filters or search query',
      viewDetails: 'View Details', lost: 'Lost', found: 'Found', claimed: 'Claimed',
    },
    itemDetails: {
      status: 'Status', category: 'Category', location: 'Location', date: 'Date',
      description: 'Description', contactInfo: 'Contact Information',
      claimButton: 'This Is Mine', qrCode: 'QR Code',
      qrCodeDesc: 'Show this QR code when claiming the item',
      similarItems: 'Similar Items', possibleMatch: 'Possible Match Found',
      matchDesc: 'This item might match your lost item',
    },
    dashboard: {
      title: 'My Dashboard', myItems: 'My Items', myClaims: 'My Claims', profile: 'Profile',
      stats: { reported: 'Items Reported', claims: 'Claims Made', recovered: 'Items Recovered' },
      tabs: { all: 'All', lost: 'Lost', found: 'Found', claimed: 'Claimed' },
      actions: { edit: 'Edit', delete: 'Delete', view: 'View' },
      noItems: 'No items yet', noClaims: 'No claims yet',
    },
    admin: {
      title: 'Admin Dashboard', users: 'Users', items: 'Items', claims: 'Claims',
      analytics: 'Analytics', manageUsers: 'Manage Users', manageItems: 'Manage Items',
      manageClaims: 'Manage Claims', approve: 'Approve', reject: 'Reject', remove: 'Remove',
      totalUsers: 'Total Users', totalItems: 'Total Items',
      pendingClaims: 'Pending Claims', resolvedClaims: 'Resolved Claims',
    },
    common: {
      loading: 'Loading...', error: 'Error', success: 'Success', cancel: 'Cancel',
      confirm: 'Confirm', save: 'Save', delete: 'Delete', edit: 'Edit', view: 'View',
      close: 'Close', back: 'Back', next: 'Next', submit: 'Submit', search: 'Search',
      filter: 'Filter', sort: 'Sort', noData: 'No data available',
      theme: { light: 'Light', dark: 'Dark', system: 'System' }, language: 'Language',
    },
    footer: {
      about: 'About FindIt', aboutDesc: 'FindIt is a campus platform helping students recover lost items.',
      quickLinks: 'Quick Links', contact: 'Contact Us', email: 'Email',
      phone: 'Phone', address: 'Campus Address', rights: 'All rights reserved.',
    },
  },
  kn: {
    nav: {
      home: 'ಮುಖಪುಟ', browse: 'ವಸ್ತುಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
      reportLost: 'ಕಳೆದುಹೋದದನ್ನು ವರದಿ ಮಾಡಿ', reportFound: 'ಸಿಕ್ಕಿದ್ದನ್ನು ವರದಿ ಮಾಡಿ',
      about: 'ನಮ್ಮ ಬಗ್ಗೆ', contact: 'ಸಂಪರ್ಕಿಸಿ', login: 'ಲಾಗಿನ್',
      signup: 'ಸೈನ್ ಅಪ್', dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', admin: 'ಅಡ್ಮಿನ್', logout: 'ಲಾಗ್ಔಟ್',
    },
    home: {
      hero: {
        title: 'ಏನಾದರೂ ಕಳೆದುಹೋಗಿದೆಯೇ?',
        subtitle: 'ನಾವು ಅದನ್ನು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
        description: 'FindIt ಕ್ಯಾಂಪಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ವರದಿ ಮಾಡಲು ಮತ್ತು ಮರಳಿ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
        reportLost: 'ಕಳೆದುಹೋದ ವಸ್ತುವನ್ನು ವರದಿ ಮಾಡಿ', reportFound: 'ಸಿಕ್ಕಿದ ವಸ್ತುವನ್ನು ವರದಿ ಮಾಡಿ',
      },
      search: { placeholder: 'ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ...', button: 'ಹುಡುಕಿ', allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು', allLocations: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು', allStatus: 'ಎಲ್ಲಾ ಸ್ಥಿತಿ' },
      howItWorks: {
        title: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', subtitle: 'ನಿಮ್ಮ ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ಮರಳಿ ಪಡೆಯಲು ಸರಳ ಹಂತಗಳು',
        step1: { title: 'ವರದಿ ಮಾಡಿ', description: 'ನಿಮ್ಮ ಕಳೆದುಹೋದ ಅಥವಾ ಸಿಕ್ಕಿದ ವಸ್ತುವನ್ನು ವರದಿ ಮಾಡಲು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.' },
        step2: { title: 'ನಾವು ಹೊಂದಿಸುತ್ತೇವೆ', description: 'ನಮ್ಮ AI ವ್ಯವಸ್ಥೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಹುಡುಕುತ್ತದೆ.' },
        step3: { title: 'ಅಧಿಸೂಚನೆ ಪಡೆಯಿರಿ', description: 'ಹೊಂದಾಣಿಕೆ ಸಿಕ್ಕಾಗ ಇಮೇಲ್ ಮತ್ತು SMS ಅಧಿಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ.' },
        step4: { title: 'ಹಕ್ಕು ಸಾಧಿಸಿ ಮತ್ತು ಮರಳಿ ಪಡೆಯಿರಿ', description: 'QR ಕೋಡ್ ಬಳಸಿ ನಿಮ್ಮ ವಸ್ತುವನ್ನು ಮರಳಿ ಪಡೆಯಿರಿ.' },
      },
      recentItems: { title: 'ಇತ್ತೀಚೆಗೆ ಸೇರಿಸಿದ ವಸ್ತುಗಳು', viewAll: 'ಎಲ್ಲಾ ವಸ್ತುಗಳನ್ನು ವೀಕ್ಷಿಸಿ', noItems: 'ಯಾವುದೇ ವಸ್ತುಗಳು ಸಿಗಲಿಲ್ಲ' },
      testimonials: { title: 'ವಿದ್ಯಾರ್ಥಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ', subtitle: 'ನಮ್ಮ ಕ್ಯಾಂಪಸ್ ಸಮುದಾಯದಿಂದ ನಿಜವಾದ ಕಥೆಗಳು' },
    },
    auth: {
      login: { title: 'ಮರಳಿ ಸ್ವಾಗತ', subtitle: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ', email: 'ಇಮೇಲ್ ವಿಳಾಸ', phone: 'ಫೋನ್ ಸಂಖ್ಯೆ', password: 'ಪಾಸ್‌ವರ್ಡ್', remember: 'ನನ್ನನ್ನು ನೆನಪಿಡಿ', forgot: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?', button: 'ಲಾಗಿನ್', noAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?', signupLink: 'ಸೈನ್ ಅಪ್', orContinue: 'ಅಥವಾ ಮುಂದುವರಿಸಿ', google: 'ಗೂಗಲ್' },
      signup: { title: 'ಖಾತೆ ರಚಿಸಿ', subtitle: 'ನಮ್ಮ ಕ್ಯಾಂಪಸ್ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ', name: 'ಪೂರ್ಣ ಹೆಸರು', email: 'ಇಮೇಲ್ ವಿಳಾಸ', phone: 'ಫೋನ್ ಸಂಖ್ಯೆ', password: 'ಪಾಸ್‌ವರ್ಡ್', confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ', button: 'ಸೈನ್ ಅಪ್', hasAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?', loginLink: 'ಲಾಗಿನ್', terms: 'ನಾನು ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೇನೆ' },
      forgotPassword: { title: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ', subtitle: 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ', email: 'ಇಮೇಲ್ ವಿಳಾಸ', button: 'ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಕಳುಹಿಸಿ', backToLogin: 'ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ' },
    },
    report: {
      lost: { title: 'ಕಳೆದುಹೋದ ವಸ್ತುವನ್ನು ವರದಿ ಮಾಡಿ', subtitle: 'ನಿಮ್ಮ ಕಳೆದುಹೋದ ವಸ್ತುವಿನ ವಿವರಗಳನ್ನು ನೀಡಿ' },
      found: { title: 'ಸಿಕ್ಕಿದ ವಸ್ತುವನ್ನು ವರದಿ ಮಾಡಿ', subtitle: 'ಸಿಕ್ಕಿದ ವಸ್ತುವಿನ ವಿವರಗಳನ್ನು ನೀಡಿ' },
      fields: { itemName: 'ವಸ್ತುವಿನ ಹೆಸರು', itemNamePlaceholder: 'ಉದಾ. ಕಪ್ಪು ವಾಲೆಟ್', category: 'ವರ್ಗ', selectCategory: 'ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ', date: 'ದಿನಾಂಕ', location: 'ಸ್ಥಳ', selectLocation: 'ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ', description: 'ವಿವರಣೆ', descriptionPlaceholder: 'ವಸ್ತುವನ್ನು ವಿವರವಾಗಿ ವಿವರಿಸಿ...', uploadImage: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', dragDrop: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ', imageFormats: 'PNG, JPG, JPEG 5MB ವರೆಗೆ', contactInfo: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ', phone: 'ಫೋನ್ ಸಂಖ್ಯೆ', email: 'ಇಮೇಲ್ ವಿಳಾಸ', submitButton: 'ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ' },
    },
    browse: { title: 'ವಸ್ತುಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ', subtitle: 'ನಿಮ್ಮ ಕಳೆದುಹೋದ ವಸ್ತುವನ್ನು ಹುಡುಕಿ', filters: 'ಫಿಲ್ಟರ್‌ಗಳು', clearAll: 'ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ', categories: 'ವರ್ಗಗಳು', locations: 'ಸ್ಥಳಗಳು', status: 'ಸ್ಥಿತಿ', sort: 'ವಿಂಗಡಿಸಿ', sortNewest: 'ಹೊಸದು ಮೊದಲು', sortOldest: 'ಹಳೆಯದು ಮೊದಲು', noResults: 'ಯಾವುದೇ ವಸ್ತುಗಳು ಸಿಗಲಿಲ್ಲ', noResultsDesc: 'ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ', viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ', lost: 'ಕಳೆದುಹೋಗಿದೆ', found: 'ಸಿಕ್ಕಿದೆ', claimed: 'ಹಕ್ಕು ಸಾಧಿಸಲಾಗಿದೆ' },
    itemDetails: { status: 'ಸ್ಥಿತಿ', category: 'ವರ್ಗ', location: 'ಸ್ಥಳ', date: 'ದಿನಾಂಕ', description: 'ವಿವರಣೆ', contactInfo: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ', claimButton: 'ಇದು ನನ್ನದು', qrCode: 'QR ಕೋಡ್', qrCodeDesc: 'ವಸ್ತುವನ್ನು ಹಕ್ಕು ಸಾಧಿಸುವಾಗ ಈ QR ಕೋಡ್ ತೋರಿಸಿ', similarItems: 'ಸಮಾನ ವಸ್ತುಗಳು', possibleMatch: 'ಸಂಭವನೀಯ ಹೊಂದಾಣಿಕೆ ಕಂಡುಬಂದಿದೆ', matchDesc: 'ಈ ವಸ್ತು ನಿಮ್ಮ ಕಳೆದುಹೋದ ವಸ್ತುವಿಗೆ ಹೊಂದಿಕೆಯಾಗಬಹುದು' },
    dashboard: { title: 'ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', myItems: 'ನನ್ನ ವಸ್ತುಗಳು', myClaims: 'ನನ್ನ ಹಕ್ಕುಗಳು', profile: 'ಪ್ರೊಫೈಲ್', stats: { reported: 'ವರದಿ ಮಾಡಿದ ವಸ್ತುಗಳು', claims: 'ಮಾಡಿದ ಹಕ್ಕುಗಳು', recovered: 'ಮರಳಿ ಪಡೆದ ವಸ್ತುಗಳು' }, tabs: { all: 'ಎಲ್ಲಾ', lost: 'ಕಳೆದುಹೋಗಿದೆ', found: 'ಸಿಕ್ಕಿದೆ', claimed: 'ಹಕ್ಕು ಸಾಧಿಸಲಾಗಿದೆ' }, actions: { edit: 'ಸಂಪಾದಿಸಿ', delete: 'ಅಳಿಸಿ', view: 'ವೀಕ್ಷಿಸಿ' }, noItems: 'ಇನ್ನೂ ಯಾವುದೇ ವಸ್ತುಗಳಿಲ್ಲ', noClaims: 'ಇನ್ನೂ ಯಾವುದೇ ಹಕ್ಕುಗಳಿಲ್ಲ' },
    admin: { title: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', users: 'ಬಳಕೆದಾರರು', items: 'ವಸ್ತುಗಳು', claims: 'ಹಕ್ಕುಗಳು', analytics: 'ವಿಶ್ಲೇಷಣೆ', manageUsers: 'ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ', manageItems: 'ವಸ್ತುಗಳನ್ನು ನಿರ್ವಹಿಸಿ', manageClaims: 'ಹಕ್ಕುಗಳನ್ನು ನಿರ್ವಹಿಸಿ', approve: 'ಅನುಮೋದಿಸಿ', reject: 'ತಿರಸ್ಕರಿಸಿ', remove: 'ತೆಗೆದುಹಾಕಿ', totalUsers: 'ಒಟ್ಟು ಬಳಕೆದಾರರು', totalItems: 'ಒಟ್ಟು ವಸ್ತುಗಳು', pendingClaims: 'ಬಾಕಿ ಇರುವ ಹಕ್ಕುಗಳು', resolvedClaims: 'ಪರಿಹರಿಸಿದ ಹಕ್ಕುಗಳು' },
    common: { loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', error: 'ದೋಷ', success: 'ಯಶಸ್ವಿ', cancel: 'ರದ್ದುಮಾಡಿ', confirm: 'ದೃಢೀಕರಿಸಿ', save: 'ಉಳಿಸಿ', delete: 'ಅಳಿಸಿ', edit: 'ಸಂಪಾದಿಸಿ', view: 'ವೀಕ್ಷಿಸಿ', close: 'ಮುಚ್ಚಿ', back: 'ಹಿಂದೆ', next: 'ಮುಂದೆ', submit: 'ಸಲ್ಲಿಸಿ', search: 'ಹುಡುಕಿ', filter: 'ಫಿಲ್ಟರ್', sort: 'ವಿಂಗಡಿಸಿ', noData: 'ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ', theme: { light: 'ಬೆಳಕು', dark: 'ಗಾಢ', system: 'ಸಿಸ್ಟಮ್' }, language: 'ಭಾಷೆ' },
    footer: { about: 'FindIt ಬಗ್ಗೆ', aboutDesc: 'FindIt ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ಮರಳಿ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡುವ ಕ್ಯಾಂಪಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್.', quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು', contact: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', email: 'ಇಮೇಲ್', phone: 'ಫೋನ್', address: 'ಕ್ಯಾಂಪಸ್ ವಿಳಾಸ', rights: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.' },
  },
  hi: {
    nav: { home: 'होम', browse: 'आइटम ब्राउज़ करें', reportLost: 'खोया हुआ रिपोर्ट करें', reportFound: 'मिला हुआ रिपोर्ट करें', about: 'हमारे बारे में', contact: 'संपर्क करें', login: 'लॉगिन', signup: 'साइन अप', dashboard: 'डैशबोर्ड', admin: 'एडमिन', logout: 'लॉगआउट' },
    home: {
      hero: { title: 'कुछ खो गया?', subtitle: 'हम आपको इसे खोजने में मदद करेंगे।', description: 'FindIt एक कैंपस प्लेटफॉर्म है जो छात्रों को खोई हुई वस्तुओं को रिपोर्ट करने और वापस पाने में मदद करता है।', reportLost: 'खोई हुई वस्तु रिपोर्ट करें', reportFound: 'मिली हुई वस्तु रिपोर्ट करें' },
      search: { placeholder: 'वस्तुएं खोजें...', button: 'खोजें', allCategories: 'सभी श्रेणियां', allLocations: 'सभी स्थान', allStatus: 'सभी स्थिति' },
      howItWorks: {
        title: 'यह कैसे काम करता है', subtitle: 'अपनी खोई हुई वस्तुओं को वापस पाने के लिए सरल कदम',
        step1: { title: 'रिपोर्ट करें', description: 'अपनी खोई या मिली वस्तु की रिपोर्ट करने के लिए फॉर्म भरें।' },
        step2: { title: 'हम मिलान करते हैं', description: 'हमारी AI प्रणाली स्वचालित रूप से मिलान खोजती है।' },
        step3: { title: 'सूचना प्राप्त करें', description: 'मिलान मिलने पर ईमेल और SMS सूचनाएं प्राप्त करें।' },
        step4: { title: 'दावा करें और वापस पाएं', description: 'QR कोड का उपयोग करके अपनी वस्तु वापस पाएं।' },
      },
      recentItems: { title: 'हाल ही में जोड़ी गई वस्तुएं', viewAll: 'सभी वस्तुएं देखें', noItems: 'कोई वस्तु नहीं मिली' },
      testimonials: { title: 'छात्र क्या कहते हैं', subtitle: 'हमारे कैंपस समुदाय की वास्तविक कहानियां' },
    },
    auth: {
      login: { title: 'वापस स्वागत है', subtitle: 'अपने खाते में लॉगिन करें', email: 'ईमेल पता', phone: 'फोन नंबर', password: 'पासवर्ड', remember: 'मुझे याद रखें', forgot: 'पासवर्ड भूल गए?', button: 'लॉगिन', noAccount: 'खाता नहीं है?', signupLink: 'साइन अप', orContinue: 'या जारी रखें', google: 'गूगल' },
      signup: { title: 'खाता बनाएं', subtitle: 'हमारे कैंपस समुदाय से जुड़ें', name: 'पूरा नाम', email: 'ईमेल पता', phone: 'फोन नंबर', password: 'पासवर्ड', confirmPassword: 'पासवर्ड की पुष्टि करें', button: 'साइन अप', hasAccount: 'पहले से खाता है?', loginLink: 'लॉगिन', terms: 'मैं नियमों और शर्तों से सहमत हूं' },
      forgotPassword: { title: 'पासवर्ड भूल गए', subtitle: 'पासवर्ड रीसेट करने के लिए अपना ईमेल दर्ज करें', email: 'ईमेल पता', button: 'रीसेट लिंक भेजें', backToLogin: 'लॉगिन पर वापस जाएं' },
    },
    report: {
      lost: { title: 'खोई हुई वस्तु की रिपोर्ट करें', subtitle: 'अपनी खोई हुई वस्तु के बारे में विवरण प्रदान करें' },
      found: { title: 'मिली हुई वस्तु की रिपोर्ट करें', subtitle: 'मिली हुई वस्तु के बारे में विवरण प्रदान करें' },
      fields: { itemName: 'वस्तु का नाम', itemNamePlaceholder: 'उदा. काला बटुआ', category: 'श्रेणी', selectCategory: 'श्रेणी चुनें', date: 'तारीख', location: 'स्थान', selectLocation: 'स्थान चुनें', description: 'विवरण', descriptionPlaceholder: 'वस्तु का विस्तार से वर्णन करें...', uploadImage: 'छवि अपलोड करें', dragDrop: 'अपलोड करने के लिए क्लिक करें', imageFormats: 'PNG, JPG, JPEG 5MB तक', contactInfo: 'संपर्क जानकारी', phone: 'फोन नंबर', email: 'ईमेल पता', submitButton: 'रिपोर्ट सबमिट करें' },
    },
    browse: { title: 'वस्तुएं ब्राउज़ करें', subtitle: 'अपनी खोई हुई वस्तु खोजें या दूसरों की मदद करें', filters: 'फ़िल्टर', clearAll: 'सभी साफ़ करें', categories: 'श्रेणियां', locations: 'स्थान', status: 'स्थिति', sort: 'क्रमबद्ध करें', sortNewest: 'नवीनतम पहले', sortOldest: 'पुरानी पहले', noResults: 'कोई वस्तु नहीं मिली', noResultsDesc: 'अपने फ़िल्टर समायोजित करें', viewDetails: 'विवरण देखें', lost: 'खोया हुआ', found: 'मिला हुआ', claimed: 'दावा किया गया' },
    itemDetails: { status: 'स्थिति', category: 'श्रेणी', location: 'स्थान', date: 'तारीख', description: 'विवरण', contactInfo: 'संपर्क जानकारी', claimButton: 'यह मेरा है', qrCode: 'QR कोड', qrCodeDesc: 'वस्तु का दावा करते समय यह QR कोड दिखाएं', similarItems: 'समान वस्तुएं', possibleMatch: 'संभावित मिलान मिला', matchDesc: 'यह वस्तु आपकी खोई हुई वस्तु से मेल खा सकती है' },
    dashboard: { title: 'मेरा डैशबोर्ड', myItems: 'मेरी वस्तुएं', myClaims: 'मेरे दावे', profile: 'प्रोफ़ाइल', stats: { reported: 'रिपोर्ट की गई वस्तुएं', claims: 'किए गए दावे', recovered: 'वापस पाई गई वस्तुएं' }, tabs: { all: 'सभी', lost: 'खोया हुआ', found: 'मिला हुआ', claimed: 'दावा किया गया' }, actions: { edit: 'संपादित करें', delete: 'हटाएं', view: 'देखें' }, noItems: 'अभी तक कोई वस्तु नहीं', noClaims: 'अभी तक कोई दावा नहीं' },
    admin: { title: 'एडमिन डैशबोर्ड', users: 'उपयोगकर्ता', items: 'वस्तुएं', claims: 'दावे', analytics: 'विश्लेषण', manageUsers: 'उपयोगकर्ताओं को प्रबंधित करें', manageItems: 'वस्तुओं को प्रबंधित करें', manageClaims: 'दावों को प्रबंधित करें', approve: 'स्वीकृत करें', reject: 'अस्वीकार करें', remove: 'हटाएं', totalUsers: 'कुल उपयोगकर्ता', totalItems: 'कुल वस्तुएं', pendingClaims: 'लंबित दावे', resolvedClaims: 'हल किए गए दावे' },
    common: { loading: 'लोड हो रहा है...', error: 'त्रुटि', success: 'सफलता', cancel: 'रद्द करें', confirm: 'पुष्टि करें', save: 'सहेजें', delete: 'हटाएं', edit: 'संपादित करें', view: 'देखें', close: 'बंद करें', back: 'वापस', next: 'अगला', submit: 'सबमिट करें', search: 'खोजें', filter: 'फ़िल्टर', sort: 'क्रमबद्ध करें', noData: 'कोई डेटा उपलब्ध नहीं', theme: { light: 'हल्का', dark: 'गहरा', system: 'सिस्टम' }, language: 'भाषा' },
    footer: { about: 'FindIt के बारे में', aboutDesc: 'FindIt एक कैंपस प्लेटफॉर्म है जो छात्रों को खोई हुई वस्तुओं को वापस पाने में मदद करता है।', quickLinks: 'त्वरित लिंक', contact: 'हमसे संपर्क करें', email: 'ईमेल', phone: 'फोन', address: 'कैंपस पता', rights: 'सर्वाधिकार सुरक्षित।' },
  },
}

export const getTranslation = (language, path) => {
  const keys = path.split('.')
  let value = translations[language]
  for (const key of keys) { value = value?.[key] }
  return value || path
}
