import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export const useClerkUser = () => {
  try {
    return useUser()
  } catch {
    // Clerk not initialized, return a default state
    return { isSignedIn: false, user: null, isLoaded: true }
  }
}

export const ClerkUserButton = ({ afterSignOutUrl = '/' }) => {
  try {
    return <UserButton afterSignOutUrl={afterSignOutUrl} />
  } catch {
    return null
  }
}
