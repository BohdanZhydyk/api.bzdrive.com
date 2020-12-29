import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'


const useStyles = createUseStyles({
	headerL:{
		width:'20%',
		padding:'0 1vw',
		fontSize:'2vw'
	}
})

export const Logo = ({project})=>{

	const styles = useStyles()

	return (
		<>
    {
			project
			?
			<a className={classNames({ [styles.headerL]:true, 'flex':true, 'start':true })} target="_blank" rel="noreferrer"
				href={`https://${project.link[0]}${project.link[1]}${project.link[2]}${project.link[3]}`}
			>
				<img className="imgBtn" alt="logo"
						src={`https://files.bzdrive.com/img/${project.name}/logo/logo${project.name}.gif`} />
				<span>{ project.link[0] }</span><span className="txtOrg">{ project.link[1] }</span>
	 			<span>{ project.link[2] }</span><span className="txtOrg">{ project.link[3] }</span>
			</a>
			:
			<div className={classNames({ [styles.headerL]:true, 'flex':true, 'start':true })} >
				<div className="imgBtn noData"></div>
				<span className="noData">-----------------</span>
			</div>
		}
		</>
	)
}