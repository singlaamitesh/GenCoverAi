declare module 'sib-api-v3-sdk' {
  export namespace ApiClient {
    export class instance {
      authentications: {
        'api-key': {
          apiKey: string
        }
      }
    }
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(sendSmtpEmail: {
      to: Array<{ email: string; name?: string }>
      replyTo: { email: string; name?: string }
      htmlContent: string
      subject: string
      sender: { name: string; email: string }
    }): Promise<any>
  }
}
