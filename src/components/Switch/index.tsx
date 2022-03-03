import { Switch } from "@headlessui/react";

interface SwitchProps {
  checked: boolean;
  onChange(): any;
}

export default function SwitchComponent(props: SwitchProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={props.onChange}
      className={`${props.checked ? "bg-gray-900" : "bg-gray-600"}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${props.checked ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}
