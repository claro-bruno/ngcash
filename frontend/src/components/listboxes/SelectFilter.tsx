import { Listbox, Transition } from '@headlessui/react'
import { ArrowsVertical, Check } from 'phosphor-react'
import { Fragment, useEffect, useState } from 'react'
import './filters.css'

export default function SelectFilter({
  setFilter,
  selectOptions,
  listCSS,
  selectedIcon = true,
}: {
  setFilter?: (optionName: string) => void
  selectOptions: { name: string; number?: number }[]
  listCSS?: string
  selectedIcon?: boolean
}) {
  function setSelectedOptions() {
    const currentDate = new Date()
    if (selectOptions.length === 12) {
      const currentMonthNumber = currentDate.getMonth()
      return selectOptions[currentMonthNumber]
    }
    if (selectOptions.length === 5) {
      const currentYear = currentDate.getFullYear()
      return selectOptions.filter((y) => Number(y.name) === currentYear)[0]
    }
    return selectOptions[0]
  }
  const [selected, setSelected] = useState(setSelectedOptions())
  useEffect(() => {
    setFilter && setFilter(selected.name)
  }, [selected])

  return (
    <div className={listCSS ?? ' w-[5.5rem]'}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="group relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500  sm:text-sm ">
            <span className="block truncate">{selected.name}</span>
            <span className=" pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
              <ArrowsVertical
                className="h-5 w-5 text-gray-400 group-hover:text-brand group-focus:text-brand"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="ListboxOptions">
              {selectOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative  cursor-default select-none py-2 pl-7 pr-1 ${
                      active ? 'bg-amber-100 text-brand' : 'text-gray-800'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        title={selectedIcon ? undefined : option.name}
                        className={`block truncate ${
                          selected ? 'font-semibold ' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected && selectedIcon ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-brand">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
