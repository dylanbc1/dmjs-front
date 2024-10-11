import { HeaderLogo } from "@/components/header-logo"
import { Navigation } from "@/components/navigation"
import { WelcomeMsg } from "@/components/welcome-msg"
import { UserButton } from "./dashboard/user-button"
import { Filters } from "./dashboard/filters"
export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-[#1c1c3c] to-[#2a2a5a] px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        
                    </div>
                    <div className="flex items-center ml-auto">
                        <Navigation />
                        <UserButton />
                    </div>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    )
}