import { useEffect, useState } from "react";

export default function Welcome(props) {
  const [text, setText] = useState();

  useEffect(() => {
    const date = new Date().getHours();

    if (date >= 7 && date <= 12) {
      setText(`Good morning ${props.user}!`);
    } else if (date >= 13 && date <= 18) {
      setText(`Good afternoon ${props.user}!`);
    } else {
      setText(`Good evening ${props.user}!`);
    }
  });

  return <h2 className="font-semibold text-xl">{text}</h2>;
}
