import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export default function AuthMiddleware({ children }: Props) {
  const name = localStorage.getItem("name")
  const navigate = useNavigate()
  useEffect(() => {
    if (!name) {
      return navigate("/get-started")
    }
    return navigate("/")
  }, [name, navigate])
  return (
    <>
      {children}
    </>
  )
}
