/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "flip-up": {
                    "0%": { transform: "rotate(0.0deg)" },
                    "100%": { transform: "rotate(180.0deg)" },
                },
                "flip-down": {
                    "0%": { transform: "rotate(180.0deg)" },
                    "100%": { transform: "rotate(0.0deg)" },
                },
            },
            animation: {
                "flip-icon-up": "flip-up 0.25s forwards",
                "flip-icon-down": "flip-down 0.25s forwards",
            },
        },
    },
    plugins: [],
}
