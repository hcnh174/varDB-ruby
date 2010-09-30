require 'rubygems'
require 'Rjb'

Rjb::load("./jxl.jar", ['-Xms512M', '-Xmx1024M'])

file_class = Rjb::import('java.io.File')
workbook_class = Rjb::import('jxl.Workbook')
number_class = Rjb::import('jxl.write.Number')
image_class = Rjb::import('jxl.write.WritableImage')
label_class = Rjb::import('jxl.write.Label')
format_class = Rjb::import('jxl.write.WritableCellFormat')
color_class = Rjb::import('jxl.format.Colour')
border_class = Rjb::import('jxl.format.Border')
lineStyle_class = Rjb::import('jxl.format.BorderLineStyle')
alignment_class = Rjb::import('jxl.format.Alignment')
font_class = Rjb::import('jxl.write.WritableFont')
underlineStyle_class = Rjb::import('jxl.format.UnderlineStyle')
cellview_class = Rjb::import('jxl.CellView')

book = workbook_class.createWorkbook(file_class.new("tOut.xls"))
sheet = book.createSheet("My First Sheet", 0)

topCellFormat = format_class.new()
topCellFormat.setBackground(color_class.LIGHT_ORANGE)
topCellFormat.setBorder(border_class.ALL, lineStyle_class.MEDIUM, color_class.BLACK)
topCellFormat.setAlignment(alignment_class.CENTRE)

label = label_class.new(0, 1, "Woo A Header Cell", topCellFormat)
sheet.addCell(label)
sheet.mergeCells(0,1,2,1)

format2 = format_class.new()
format2.setAlignment(alignment_class.CENTRE)

label = label_class.new(0, 3, "And some sub-header action", format2)
sheet.addCell(label)
sheet.mergeCells(0,3,2,3)

headerFont = font_class.new(font_class.ARIAL)
headerFont.setUnderlineStyle(underlineStyle_class.SINGLE)
headerFont.setBoldStyle(font_class.BOLD)
headerFormat = format_class.new(headerFont)
headerFormat.setBackground(color_class.GRAY_25)
headerFormat.setBorder(border_class.ALL, lineStyle_class.THIN, color_class.BLACK)
headerFormat.setAlignment(alignment_class.CENTRE)

label = label_class.new(0, 5, "My Col Data 1", headerFormat)
sheet.addCell(label)
label = label_class.new(1, 5, "My Col Data 2", headerFormat)
sheet.addCell(label)
label = label_class.new(2, 5, "My Col Data 3", headerFormat)
sheet.addCell(label)

cView = cellview_class.new()
cView.setAutosize(true)
sheet.setColumnView(0,cView)
sheet.setColumnView(1,cView)
sheet.setColumnView(2,cView)

sheet.getSettings().setVerticalFreeze(6)

(6...100).each do |i|
  label = label_class.new(0, i, "Some text: #{i}")
  sheet.addCell(label)
  number = number_class.new(1, i, i*i)
  sheet.addCell(number)
  label = label_class.new(2, i, "Wheeeee")
  sheet.addCell(label)
end

img = image_class.new(5, 1, 2, 5, file_class.new("SOTC.png"))
sheet.addImage(img)  

book.write
book.close