const navigation = [
  {
    title: "Getting Started",
    items: [
      "Introduction",
      "Installation",
      "Theme",
    ],
  },
  {
    title: "Components",
    items: [
      "Button",
      "Input",
      "Card",
      "Modal",
    ],
  },
];


export function Sidebar() {
  return (
    <aside
      className="
        sticky
        top-16
        hidden
        h-[calc(100vh-4rem)]
        w-64
        shrink-0
        border-r
        border-gray-200
        lg:block
      "
    >
      <nav className="space-y-8 p-6">

        {navigation.map(section => (
          <div key={section.title}>
            <h3 className="mb-3 text-sm font-semibold">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.items.map(item => (
                <li
                  key={item}
                  className="
                    cursor-pointer
                    text-sm
                    text-muted-foreground
                    hover:text-foreground
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </nav>
    </aside>
  );
}