import {
  CloseButton,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  Tabs
} from "@chakra-ui/react"
import Logo from "../../element/Logo"
import { CalendarIcon, EditIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons"
import { useSearchStore } from "../../../utils/zustand/SearchStore"
import { useState } from "react"

function SideBar() {
  const [sidebarShow, setSidebarShow] = useState(false)
  const [search, setSearch] = useSearchStore(state => [state.search, state.setSearch])
  const tabData = [
    {
      id: 1,
      icon: <EditIcon />,
      text: "Notes",
      href: "/"
    },
    {
      id: 2,
      icon: <CalendarIcon />,
      text: "Archive",
      href: "/archive"
    }
  ]
  function setPath(path: string): void {
    window.location.href = path
  }
  function setSearchNotes(keyword: string): void {
    setSearch(keyword)
  }
  function handleClick() {
    setSidebarShow(state => !state)
  }
  return (
    <>
      {
        window.innerWidth < 480 &&
        <span className="w-5 h-5 absolute top-3 left-3 z-10">
          <IconButton aria-label='Search database' icon={<HamburgerIcon fontSize={"1.5rem"} />} onClick={handleClick} size={"xl"} colorScheme={"transparent"} color={"#fff"} />
        </span>
      }
      <aside className={`h-full fixed sm:relative sm:z-10 sm:w-2/5 lg:w-1/5 flex flex-col left-0 ${sidebarShow ? "w-2/3 px-3 z-20" : "w-0 p-0 -z-10"} duration-500 bg-dark-green sm:px-4`} >
        <section className="h-1/6 w-full flex items-center relative">
          <Logo />
          {
            window.innerWidth < 480 &&
            <CloseButton onClick={handleClick} className="absolute top-2 right-1" color={"#D9F47B"} />
          }
        </section>
        <section className="flex flex-col gap-8">
          <InputGroup className="text-beige">
            <InputLeftElement pointerEvents='none'>
              <SearchIcon />
            </InputLeftElement>
            <Input value={search} onChange={(e) => setSearchNotes(e.target.value)} variant={"flushed"} focusBorderColor="#D9F47B" placeholder="Search Notes" />
          </InputGroup>
          <Tabs variant='unstyled' className="h-3/4 w-full text-beige text-lg">
            <TabList display={"flex"} flexDirection={"column"} gap={"12px"}>
              {
                tabData.map((data) => (
                  <Tab
                    key={data.id}
                    onClick={() => setPath(data.href)}
                    _hover={{ background: "#003A33", color: "#D9F47B" }}
                    display={"flex"}
                    gap={"25px"}
                    justifyContent={"start"}
                    fontSize={"inherit"}
                    width={"100%"}
                    borderRadius={"14px"}
                    height={"50px"}
                  >
                    {data.icon}
                    <p className="text-beige">{data.text}</p>
                  </Tab>
                ))
              }
            </TabList>
          </Tabs>
        </section>
      </aside>
    </>
  )
}

export default SideBar