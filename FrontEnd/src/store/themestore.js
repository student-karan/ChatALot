import { create } from "zustand";

export const selectTheme = create((set) => ({
    theme: localStorage.getItem("theme") || "light",
    changeTheme: (newtheme) => {
        localStorage.setItem("theme",newtheme);
        set({theme:newtheme});
    }
})
)