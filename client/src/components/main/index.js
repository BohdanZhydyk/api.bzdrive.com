import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './Main.scss'

import News from './content/News'
import Api from './content/Api'
import CV from './content/CV'
import Applications from './content/Applications'
import About from './content/About'

import Profile from './content/Profile'
import Statistic from './content/Statistic'

import Loader from './content/Loader'
import Error from './content/Error'


const Main = ({state, fn})=>{

	let active = state.drive.auth.active
	let TOGGLE_MENU = ()=> active && fn({ app:"drive", type:"TOGGLE_MENU", payload:true })

	return(
			<main onClick={ ()=> TOGGLE_MENU() } >
				<div className={ active ? "filter-blur" : "filter" } >
				<Switch>
				{
					state.drive.nav.map( (route, index)=>{
						let to = route.to
						switch(to){
							case "/": return <Route exact path={to} component={ ()=> <News content={route.content} user={state.user} fn={fn} /> } />
							case "/api": return <Route path={to} component={ ()=> <Api content={route.content} user={state.user} fn={fn} /> } />
							case "/cv": return <Route path={to} component={ ()=> <CV content={route.content} user={state.user} fn={fn} /> } />
							case "/apps": return <Route path={to} component={ ()=> <Applications content={route.content} user={state.user} fn={fn} /> } />
							case "/about": return <Route path={to} component={ ()=> <About content={route.content} user={state.user} fn={fn} /> }	/>
							
							case "/profile": return <Route path={to} component={ ()=> <Profile content={route.content} user={state.user} fn={fn} /> }	/>
							case "/statistic": return <Route path={to} component={ ()=> <Statistic content={route.content} user={state.user} fn={fn} /> }	/>
							
							case "": return <Loader />
							default: return <Route component={ ()=> <Error /> }	/>
						}

					})
				}
				</Switch>
				</div>
		</main>
	)
}

export default Main