import { NextResponse } from 'next/server'
import { SquareClient, SquareEnvironment } from 'square'

export async function POST(request: Request) {
  try {
    const { sourceId, amount, items } = await request.json()

    console.log('Payment request:', {
      amount,
      sourceId: sourceId ? 'present' : 'missing',
      itemCount: items?.length || 0
    })

    const client = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN!,
      environment: SquareEnvironment.Sandbox,
    })

    // Make the payment request
    const response = await client.payments.create({
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD',
      },
      idempotencyKey: crypto.randomUUID(),
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
      note: `Order: ${items.map((i: any) => i.itemTitle).join(', ')}`,
    })

    // Extract payment info from the response based on the actual structure
    // From the logs, we can see the payment information is directly in the response.payment object
    if (!response.payment) {
      throw new Error('Payment response did not contain payment information');
    }
    
    // Extract the order ID and receipt URL
    const orderId = response.payment.id;
    const receiptUrl = response.payment.receiptUrl;
    
    console.log(`Payment successful: ID = ${orderId}, Receipt URL = ${receiptUrl}`);
    
    return NextResponse.json({
      success: true,
      orderId: orderId,
      receipt: receiptUrl,
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