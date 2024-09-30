import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export default function AuthMiddleware({ children }: Props) {
  const name = localStorage.getItem("name")
  const navigate = useNavigate()
  const {pathname} = useLocation()
  useEffect(() => {
    if (!name) {
      return navigate("/get-started")
    }
    if(pathname == "/") {
      return navigate("/note/active")
    }
  }, [name, navigate, pathname])
  return (
    <>
      {children}
    </>
  )
}
