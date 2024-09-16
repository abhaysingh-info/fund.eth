'use client'

import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/services/user.service'
import * as UserService from '@/services/user.service'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })

	const [generalError, setGeneralError] = useState('')
	const [generalSuccess, setGeneralSuccess] = useState('')
	let [requestInProgress, setRequestInProgress] = useState(false)

	const userContext = useContext(UserService.user)
	const isLoggedInContext = useContext(UserService.isLoggedIn)

	const { push } = useRouter()

	const validateEmail = (email: string) => {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return re.test(email)
	}

	const validatePassword = (password: string) => {
		return password.length >= 8
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const newErrors = { email: '', password: '' }

		if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email address'
		}

		if (!validatePassword(password)) {
			newErrors.password = 'Password must be at least 8 characters long'
		}

		setErrors(newErrors)

		if (!newErrors.email && !newErrors.password) {
			setRequestInProgress(true)
			requestInProgress = true
			try {
				const resp = await loginUser(
					{
						email,
						password,
					},
					userContext,
					isLoggedInContext,
				)

				if (resp.token || resp.success) {
					setGeneralSuccess('Logged in successfully!')
					setTimeout(() => {
						push('/')
					}, 1000)
				} else {
					if ((resp?.error || resp?.message || '').includes('email')) {
						setErrors({
							email: resp.error,
							password: '',
						})
					} else if (
						(resp?.error || resp?.message || '').includes('password')
					) {
						setErrors({
							email: '',
							password: resp.error,
						})
					} else if (
						(resp?.error || resp?.message || '').includes('confirm_password')
					) {
						setErrors({
							email: '',
							password: '',
						})
					}

					setGeneralError(`${resp?.error || resp?.message || ''}`)
				}
			} catch (error: any) {
				setGeneralError(
					error?.error?.message || error?.message || 'Error in creating user',
				)
			}

			requestInProgress = false
			setRequestInProgress(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="p-8 rounded-lg shadow-md w-full max-w-96 border">
				<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={errors.email ? 'border-red-500' : ''}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email}</p>
						)}
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={errors.password ? 'border-red-500' : ''}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">{errors.password}</p>
						)}
					</div>
					<div className="my-4">
						<p className="text-sm text-destructive">{generalError || ''}</p>
						<p className="text-sm text-green-500">{generalSuccess || ''}</p>
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</div>
		</div>
	)
}
