import React, { useState, useEffect, useRef } from 'react'
import firebase, { FIREDB } from '../../utils/firebase'
import { Input, Button } from '@material-ui/core'
import instructions, { swear } from '../data/instructions'

const Chat = (props) => {
	const messageEnd = useRef(null)
	const [messages, setMessages] = useState([])
	const [msg, setMsg] = useState('')

	const { feed, user, opponent, matchId, role } = props

	useEffect(() => {
		if (messageEnd) {
			messageEnd.current.addEventListener('DOMNodeInserted', (event) => {
				const { currentTarget: target } = event
				target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
			})
		}
		const messageRef = FIREDB.ref(`Match/${matchId}/messages`)
		if (role === 'host') {
			instructions.forEach((line) => {
				messageRef.push(line)
			})
		}
	}, [])

	useEffect(() => {
		const messageRef = FIREDB.ref(`Match/${matchId}/messages`)
		let swearCounter = 0
		messageRef.on('value', (snapshot) => {
			let allMessages = []
			const messages = snapshot.val()
			for (let id in messages) {
				if (messages[id].message.match(swear)) {
					swearCounter++
					const swearMessageLength = messages[id].message
						.match(swear)
						.reduce((total, curr) => {
							return (total += curr.length)
						}, 0)
					const noSwearMessage = messages[id].message.replace(
						swear,
						'*'.repeat(swearMessageLength)
					)
					allMessages.push({
						id,
						user: messages[id].user,
						message: noSwearMessage,
					})

					if (swearCounter === 15) {
						allMessages.push({
							user: 'admin',
							message: 'Please watch your language',
						})
						swearCounter = 0
					}
				} else {
					allMessages.push({ id, ...messages[id] })
				}
			}
			setMessages(allMessages)
		})
		if (role === 'host') {
			sendFeed(feed)
		}
	}, [feed])

	function sendMessage(e) {
		e.preventDefault()

		const messageRef = FIREDB.ref(`Match/${matchId}/messages`)
		const Message = {
			user: user.username,
			message: msg,
		}

		messageRef.push(Message)
		setMsg('')
	}

	function sendFeed(attackFeed) {
		const messageRef = firebase.database().ref(`Match/${matchId}/messages`)

		attackFeed.map((feed) => {
			setTimeout(() => {
				messageRef.push(feed)
			}, 0)
		})
	}

	return (
		<div className='chat'>
			<div className='messages' ref={messageEnd}>
				{messages.map(({ id, user, message, type }) =>
					type === 'feed' ? (
						<div key={id} className='feed'>
							{message}
						</div>
					) : type === 'instructions' ? (
						<div key={id} className='instructions'>
							{message}
						</div>
					) : (
						<div key={id} className='message'>
							<h4>{user}</h4>
							<p>{message}</p>
						</div>
					)
				)}
			</div>

			<form onSubmit={(e) => sendMessage(e)}>
				<Input
					value={msg}
					type='text'
					onChange={(e) => setMsg(e.target.value)}
					placeholder='Enter message here'
				/>
				<Button type='submit' disabled={!msg}>
					Send
				</Button>
			</form>
		</div>
	)
}

export default Chat
