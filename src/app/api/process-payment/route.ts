import { NextResponse } from 'next/server'
import { SquareClient, SquareEnvironment } from 'square'

export async function POST(request: Request) {
  try {
    const { sourceId, amount, items, customer } = await request.json()

    console.log('Payment request:', {
      amount,
      sourceId: sourceId ? 'present' : 'missing',
      itemCount: items?.length || 0,
      hasCustomerInfo: !!customer
    })

    const client = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN!, // Use 'token' not 'accessToken'
      environment: SquareEnvironment.Production, // Switch to Production
    })

    // Prepare payment request
    const paymentRequest: any = {
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD',
      },
      idempotencyKey: crypto.randomUUID(),
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
      note: `Order: ${items.map((i: any) => i.itemTitle).join(', ')}`,
    }
    
    // Add buyer email address if available
    if (customer && customer.email) {
      paymentRequest.buyerEmailAddress = customer.email
    }

    // Make the payment request
    const response = await client.payments.create(paymentRequest)

    // Use the working response structure
    if (!response.payment) {
      throw new Error('Payment response did not contain payment information')
    }
    
    const orderId = response.payment.id
    const receiptUrl = response.payment.receiptUrl
    
    console.log(`Payment successful: ID = ${orderId}, Receipt URL = ${receiptUrl}`)
    
    return NextResponse.json({
      success: true,
      orderId: orderId,
      receipt: receiptUrl,
      customerSaved: false // We'll add customer creation later
    })
  } catch (error: any) {
    console.error('Payment processing error:', error)
    console.error('Error details:', error.errors || error.message)
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Payment failed',
      },
      { status: 500 }
    )
  }
}