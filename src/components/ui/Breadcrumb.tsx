import Link from 'next/link'

type BreadcrumbItem = {
    label: string
    href?: string
}

type BreadcrumbProps = {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="bg-stone-900">
            <div className="container mx-auto px-4 py-2">
                <ol className="flex items-center space-x-2 text-sm font-mono">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-red-600">{'>'}</span>
                            )}
                            {item.href ? (
                                <Link 
                                    href={item.href}
                                    className="text-red-600 hover:text-red-400 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-red-400">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}