import { gsap } from "gsap"
export const useGsap = (target: string, options: object, mode: "from" | "to") => {
    if (mode === "to") {
        gsap.to("." + target, options)
    } else {
        gsap.from("." + target, options)
    }
}
// gsap.to("",{
//     ease:"back.in"
// })
