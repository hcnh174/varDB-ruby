require 'win32ole'

ChartTypeVal = -4100

excel = WIN32OLE.new("excel.application")
#excel['Visible'] = TRUE
excel.Workbooks.Add()
excel.Range("a1")['Value']=3
excel.Range("a2")['Value']=2
excel.Range("a3")['Value']=1
excel.Range("a1:a3").Select()


