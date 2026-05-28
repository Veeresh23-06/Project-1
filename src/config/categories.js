// Item categories for the lost and found system
export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'accessories', label: 'Accessories', icon: '👜' },
  { id: 'books', label: 'Books & Stationery', icon: '📚' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'keys', label: 'Keys', icon: '🔑' },
  { id: 'wallets', label: 'Wallets & Bags', icon: '👛' },
  { id: 'sports', label: 'Sports Equipment', icon: '⚽' },
  { id: 'jewelry', label: 'Jewelry', icon: '💍' },
  { id: 'other', label: 'Other', icon: '📦' },
]

// Campus locations
export const LOCATIONS = [
  'Main Building',
  'Library',
  'Cafeteria',
  'Sports Complex',
  'Auditorium',
  'Parking Lot',
  'Computer Lab',
  'Hostel Block A',
  'Hostel Block B',
  'Administrative Block',
  'Garden Area',
  'Bus Stop',
  'Other',
]

// Item status
export const ITEM_STATUS = {
  LOST: 'lost',
  FOUND: 'found',
  CLAIMED: 'claimed',
  ARCHIVED: 'archived',
}

// Claim status
export const CLAIM_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

// Archive duration (30 days in milliseconds)
export const ARCHIVE_DURATION = 30 * 24 * 60 * 60 * 1000
