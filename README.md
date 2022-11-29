## Describe the goal of the application and value to a user
The goal is to ask CS students to select their desired CS courses at Brown

## Link to your deployed web application running online
https://uiuxfuckmylyfe.web.app/

## Explain the organization of your Components, and the props and state related to them
Components are each cards, and I wrote the most of the logic in the App.tsx, bad code...

here is the interface definition
```
export interface ICourseCard {
	courseName: string,
	courseNumber: string,
	pathway: Pathway,
	timeReq: number,
	professor: string,
	professorImg: string,
}

export interface ICourseCardProps extends ICourseCard {
	hours: number,
	setHours: (hours: number) => void
}
```

## Note the usability principles considered for layout and hierarchy
its clean, i used chakra UI, and i provide responsive affordances to all the buttons. i use font weight to signify important stuff
