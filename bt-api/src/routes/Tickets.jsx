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

    return (
        <>
            <p><Link to={`/details/${Id}`}>← Back to Show</Link></p>
            {show && <h2>Buy a ticket to: {show.ShowTitle}</h2>}

            {submitSuccess ? (
                //Ai added this cute success message
                <div style={{color: 'green', padding: '20px', border: '1px solid green', borderRadius: '4px'}}>
                    <p>✓ Ticket purchased successfully!</p>
                    <Link to="/">Return Home</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: '500px'}}>
                    <div style={{marginBottom: '15px'}}>
                        <label>First Name *</label>
                        <input
                            {...register('FirstName', {
                                required: 'First name is required',
                                pattern: { value: /^[a-zA-Z\s'-]{2,}$/, message: 'Invalid first name (letters only, 2+ chars)' }
                            })}
                            placeholder="John"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.FirstName && <span style={{color: 'red', fontSize: '12px'}}>{errors.FirstName.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>Last Name *</label>
                        <input
                            {...register('LastName', {
                                required: 'Last name is required',
                                pattern: { value: /^[a-zA-Z\s'-]{2,}$/, message: 'Invalid last name (letters only, 2+ chars)' }
                            })}
                            placeholder="Doe"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.LastName && <span style={{color: 'red', fontSize: '12px'}}>{errors.LastName.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>Email *</label>
                        <input
                            {...register('Email', {
                                required: 'Email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                            })}
                            placeholder="john@example.com"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.Email && <span style={{color: 'red', fontSize: '12px'}}>{errors.Email.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>Phone Number *</label>
                        <input
                            {...register('PhoneNumber', {
                                required: 'Phone number is required',
                                pattern: { value: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/, message: 'Invalid phone (e.g. 902-123-4567 or 9021234567)' }
                            })}
                            placeholder="902-123-4567"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.PhoneNumber && <span style={{color: 'red', fontSize: '12px'}}>{errors.PhoneNumber.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>Number of Tickets *</label>
                        <input
                            type="number"
                            {...register('ticketCount', {
                                required: 'Ticket count is required',
                                min: { value: 1, message: 'Must be at least 1' },
                                max: { value: 100, message: 'Max 100 tickets' }
                            })}
                            placeholder="1"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.ticketCount && <span style={{color: 'red', fontSize: '12px'}}>{errors.ticketCount.message}</span>}
                    </div>

                    {/* Luhn algorithm from: https://www.geeksforgeeks.org/dsa/luhn-algorithm/ */}
                    <div style={{marginBottom: '15px'}}>
                        <label>Card Number *</label>
                        <input
                            {...register('cardNumber', {
                                required: 'Card number is required',
                                pattern: { value: /^\d{15,19}$/, message: 'Invalid card number (15-19 digits)' },
                                validate: value => luhnCheck(value) || 'Invalid card number (failed Luhn check)'
                            })}
                            placeholder="2345678901234567"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.cardNumber && <span style={{color: 'red', fontSize: '12px'}}>{errors.cardNumber.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>CVV *</label>
                        <input
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: { value: /^\d{3,4}$/, message: 'CVV must be 3-4 digits' }
                            })}
                            placeholder="678"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.cvv && <span style={{color: 'red', fontSize: '12px'}}>{errors.cvv.message}</span>}
                    </div>

                    <div style={{marginBottom: '15px'}}>
                        <label>Expiry (MM/YY) *</label>
                        <input
                            {...register('expiry', {
                                required: 'Expiry is required',
                                pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Format: MM/YY (e.g. 12/28)' }
                            })}
                            placeholder="12/28"
                            style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        />
                        {errors.expiry && <span style={{color: 'red', fontSize: '12px'}}>{errors.expiry.message}</span>}
                    </div>

                    {submitError && <div style={{color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', borderRadius: '4px'}}>{submitError}</div>}

                    <button type="submit" disabled={loading} style={{padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1}}>
                        {loading ? 'Processing...' : 'Purchase Ticket'}
                    </button>
                </form>
            )}
        </>
    )
}

export default TicketForm