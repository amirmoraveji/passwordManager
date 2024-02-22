// declare global {
type Theme = "light" | "dark"
// }
export const setColorTheme = (newTheme: Theme): void => {
    // Implementation for setting the color theme
    useColorMode().preference = newTheme
    console.log(useColorMode().preference)
}
