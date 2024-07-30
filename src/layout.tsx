import React from 'react'
import SideBar from './ui/component/Sidebar/Sidebar'
import Banner from './ui/component/Header/Banner'
import AddNotesForm from './ui/component/Form/AddNotesForm'
import EditNotesForm from './ui/component/Form/EditNotesForm'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[100dvh] w-full flex bg-beige font-raleway">
            <SideBar />
            <div className='h-full w-full'>
                <Banner />
                {children}
            </div>
            <AddNotesForm />
            <EditNotesForm />
        </div>

    )
}
