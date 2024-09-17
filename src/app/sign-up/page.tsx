'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser } from '@/services/user.service'
import { useRouter } from 'next/navigation'

export default function SignUp() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirm_password: '',
	})
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirm_password: '',
	})

	const { push } = useRouter()

	const [generalError, setGeneralError] = useState('')
	const [generalSuccess, setGeneralSuccess] = useState('')
	let [requestInProgress, setRequestInProgress] = useState(false)

	const validateForm = () => {
		let isValid = true
		const newErrors = {
			name: '',
			email: '',
			password: '',
			confirm_password: '',
		}

		// Name validation
		if (formData.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters long'
			isValid = false
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
			isValid = false
		}

		// Password validation
		if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters long'
			isValid = false
		}

		// Confirm password validation
		if (formData.password !== formData.confirm_password) {
			newErrors.confirm_password = 'Passwords do not match'
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setGeneralError('')
		if (validateForm()) {
			setRequestInProgress(true)
			requestInProgress = true
			try {
				const resp = await createUser({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				})

				if (resp.token || resp.success) {
					setGeneralSuccess('Joined the family successfully')
					setTimeout(() => {
						push('/log-in')
					}, 1000)
				} else {
					if ((resp?.error || resp?.message || '').includes('email')) {
						setErrors({
							email: resp.error,
							password: '',
							confirm_password: '',
							name: '',
						})
					} else if (
						(resp?.error || resp?.message || '').includes('password')
					) {
						setErrors({
							email: '',
							password: resp.error,
							confirm_password: '',
							name: '',
						})
					} else if (
						(resp?.error || resp?.message || '').includes('confirm_password')
					) {
						setErrors({
							email: '',
							password: '',
							confirm_password: resp.error,
							name: '',
						})
					}

					setGeneralError(`${resp?.error || resp?.message || ''}`)
					console.log('Error in creating user', formData, errors)
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
		<div className="min-h-screen flex items-center justify-center ">
			<div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-md border">
				<h1 className="text-2xl font-bold text-center">Sign Up</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							className={errors.name ? 'border-destext-destructive' : ''}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							className={errors.email ? 'border-destext-destructive' : ''}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							className={errors.password ? 'border-destext-destructive' : ''}
						/>
						{errors.password && (
							<p className="text-sm text-destructive">{errors.password}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm_password">Confirm Password</Label>
						<Input
							id="confirm_password"
							name="confirm_password"
							type="password"
							value={formData.confirm_password}
							onChange={handleChange}
							className={
								errors.confirm_password ? 'border-destext-destructive' : ''
							}
						/>
						{errors.confirm_password && (
							<p className="text-sm text-destructive">
								{errors.confirm_password}
							</p>
						)}
					</div>
					<div className="my-4">
						<p className="text-sm text-destructive">{generalError || ''}</p>
						<p className="text-sm text-green-500">{generalSuccess || ''}</p>
					</div>
					<Button type="submit" className="w-full">
						Sign Up
					</Button>
				</form>
			</div>
		</div>
	)
}
