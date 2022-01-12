import { useEffect, useState } from "react"

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const jsonValue = localStorage.getItem(key) || (typeof initialValue === 'function' ? initialValue() : initialValue)
        try {
            return JSON.parse(jsonValue)
        }
        catch (error) {
            return jsonValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    },[key,storedValue])

    return [storedValue, setStoredValue]
}