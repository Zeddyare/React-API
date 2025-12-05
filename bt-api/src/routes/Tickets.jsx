import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function luhnCheck(cardNumber) {
    let card = cardNumber.replace(/\s/g, '')
    let sum = 0
    let shouldDouble = false
    let nDigits = card.length

    for (let i = nDigits -1; i >= 0; i--) {
        let d = card[i].charCodeAt() - '0'.charCodeAt();
        if (shouldDouble == true) 
            d = d * 2;
        sum += parseInt(d / 10, 10);
        sum += d % 10;
        shouldDouble = !shouldDouble;
    } 
    return (sum % 10) === 0;
}

function TicketForm() {
    const { Id } = useParams()
    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const apiUrl = import.meta.env.VITE_API_URL

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            FirstName: '',
            LastName: '',
            Email: '',
            PhoneNumber: '',
            ticketCount: '',
            cardNumber: '',
            cvv: '',
            expiry: '',
            ShowId: Id
        }
    })

    useEffect(() => {
        const getShowById = async () => {
            try {
                const response = await fetch(`${apiUrl}${Id}`)
                const result = await response.json()
                if (response.ok) {
                    setShow(result)
                }
            } catch (error) {
                console.error("Failed to fetch show:", error)
            }
        }
        getShowById()
    }, [apiUrl, Id])

    
    const onSubmit = async (data) => {
        setLoading(true)
        setSubmitError(null)
        try {
            const payload = {
                ...data,
                ShowId: Id,
                ticketCount: parseInt(data.ticketCount)
            }
            console.log('POST payload:', payload)

            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const result = await response.json()
            console.log('POST response:', result)

            if (response.ok) {
                setSubmitSuccess(true)
            } else {
                setSubmitError(result.message || 'Failed to purchase ticket')
            }
        } catch (error) {
            console.error("Failed to submit form:", error)
            setSubmitError(error.message)
        } finally {
            setLoading(false)
        }
    }

    //AI help with bootstrap
    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-12">
                    <Link to={`/details/${Id}`} className="btn btn-outline-secondary btn-sm">
                        ← Back to Show
                    </Link>
                </div>
            </div>

            {show && <h1 className="mb-4">Buy a ticket to: {show.ShowTitle}</h1>}

            {submitSuccess ? (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">✓ Success!</h4>
                    <p>Ticket purchased successfully!</p>
                    <Link to="/" className="btn btn-success">Return Home</Link>
                </div>
            ) : (
                <div className="container" style={{marginLeft: '15vw'}}>
                <form onSubmit={handleSubmit(onSubmit)} className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name *</label>
                        <input
                            id="firstName"
                            className={`form-control ${errors.FirstName ? 'is-invalid' : ''}`}
                            {...register('FirstName', {
                                required: 'First name is required',
                                pattern: { value: /^[a-zA-Z\s'-]{2,}$/, message: 'Invalid first name (letters only, 2+ chars)' }
                            })}
                            placeholder="John"
                        />
                        {errors.FirstName && <div className="invalid-feedback d-block">{errors.FirstName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name *</label>
                        <input
                            id="lastName"
                            className={`form-control ${errors.LastName ? 'is-invalid' : ''}`}
                            {...register('LastName', {
                                required: 'Last name is required',
                                pattern: { value: /^[a-zA-Z\s'-]{2,}$/, message: 'Invalid last name (letters only, 2+ chars)' }
                            })}
                            placeholder="Doe"
                        />
                        {errors.LastName && <div className="invalid-feedback d-block">{errors.LastName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                            id="email"
                            className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                            {...register('Email', {
                                required: 'Email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                            })}
                            placeholder="john@example.com"
                        />
                        {errors.Email && <div className="invalid-feedback d-block">{errors.Email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number *</label>
                        <input
                            id="phone"
                            className={`form-control ${errors.PhoneNumber ? 'is-invalid' : ''}`}
                            {...register('PhoneNumber', {
                                required: 'Phone number is required',
                                pattern: { value: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/, message: 'Invalid phone (e.g. 902-123-4567 or 9021234567)' }
                            })}
                            placeholder="902-123-4567"
                        />
                        {errors.PhoneNumber && <div className="invalid-feedback d-block">{errors.PhoneNumber.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ticketCount" className="form-label">Number of Tickets *</label>
                        <input
                            id="ticketCount"
                            type="number"
                            className={`form-control ${errors.ticketCount ? 'is-invalid' : ''}`}
                            {...register('ticketCount', {
                                required: 'Ticket count is required',
                                min: { value: 1, message: 'Must be at least 1' },
                                max: { value: 100, message: 'Max 100 tickets' }
                            })}
                            placeholder="1"
                        />
                        {errors.ticketCount && <div className="invalid-feedback d-block">{errors.ticketCount.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number *</label>
                        <input
                            id="cardNumber"
                            className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                            {...register('cardNumber', {
                                required: 'Card number is required',
                                pattern: { value: /^\d{15,19}$/, message: 'Invalid card number (15-19 digits)' },
                                validate: value => luhnCheck(value) || 'Invalid card number (failed Luhn check)'
                            })}
                            placeholder="2345678901234567"
                        />
                        {errors.cardNumber && <div className="invalid-feedback d-block">{errors.cardNumber.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">CVV *</label>
                        <input
                            id="cvv"
                            className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: { value: /^\d{3,4}$/, message: 'CVV must be 3-4 digits' }
                            })}
                            placeholder="678"
                        />
                        {errors.cvv && <div className="invalid-feedback d-block">{errors.cvv.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="expiry" className="form-label">Expiry (MM/YY) *</label>
                        <input
                            id="expiry"
                            className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                            {...register('expiry', {
                                required: 'Expiry is required',
                                pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Format: MM/YY (e.g. 12/28)' }
                            })}
                            placeholder="12/28"
                        />
                        {errors.expiry && <div className="invalid-feedback d-block">{errors.expiry.message}</div>}
                    </div>

                    {submitError && <div className="alert alert-danger mb-3">{submitError}</div>}

                    <button type="submit" disabled={loading} className="btn btn-primary w-100">
                        {loading ? <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...</span> : 'Purchase Ticket'}
                    </button>
                </form>
                </div>
            )}
        </div>
    )
}

export default TicketForm