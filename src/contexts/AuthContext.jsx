import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const login = (email, password) => auth.signInWithEmailAndPassword(email, password)
    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password)
    const logout = () => auth.signOut()
    const resetPassword = (email) => auth.sendPasswordResetEmail(email)
    const updateEmail = (email) => currentUser.updateEmail(email)
    const updatePassword = (password) => currentUser.updatePassword(password)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
