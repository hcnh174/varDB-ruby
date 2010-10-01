require 'mailfactory'
require 'net/smtp'

mail = MailFactory.new
mail.from = ""
mail.to = ""
mail.subject = "subject of email"
mail.text = "text of email"

#puts mail.to_s

Net::SMTP.start('', 25) do |smtp|
  puts 'sending mail'
  smtp.send_message mail.to_s, mail.from.first, mail.to
  puts 'sent'
end

