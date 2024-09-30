import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../ui/Logo";
import SearchBar from "../ui/SearchBar";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onSearch = (param: string) => {
    if (pathname !== "/search") {
      return navigate(`/search?keyword=${encodeURIComponent(param)}`, { replace: true });
    }
    return setSearchParams({ keyword: param })
  }
  return (
    <header className={`h-16 w-full flex items-center justify-around fixed top-0 z-10 bg-white ${pathname === "/get-started" && "hidden"}`}>
      <Logo />
      <SearchBar onSearch={onSearch} defaultValue={searchParams.get("keyword") || ""} />
    </header>
  )
}
