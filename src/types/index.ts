export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    label?: string
    description?: string
}

export interface NavItemWithChildren extends NavItem  {
    items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type StoredFile = {
    id: string
    name: string
    url: string
}

