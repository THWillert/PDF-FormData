#region Includes
#include <File.au3>
#include <Misc.au3>
#endregion Includes

#cs
V2.0.0
PDF-FormData-Helper
2022 by Thorsten Willert
www.thorsten-willert.de

To use with Form_Data.js to export formdata from Adobe Acrobat Reader

#ce
Global Const $__DEBUG__ = False ;#__DEBUG__

_Singleton("FormData-Helper")

Global $sFileName = ""

While Sleep(1000)

	$hWnd = WinWaitActive("JavaScript-Debugger")

	$xml = ControlGetText($hWnd, "", "RICHEDIT50W1")
	If $__DEBUG__ Then ConsoleWrite($xml & @CRLF) EndIf

	WinClose($hWnd)

	If StringLen($xml) > 10 Then

		$aFile = StringRegExp($xml, "/([\w\d-_]*?\.pdf)", 1)
		If Not @error Then
			$sFileName = $aFile[0]
		EndIf

		If StringInStr($xml, '<xfdf xmlns="http://ns.adobe.com/xfdf/') Then
			Save($sFileName, "xfdf", 2)
		ElseIf StringInStr($xml, '%FDF') Then
			Save($sFileName, "fdf", 18)
		EndIf

	EndIf

	$xml = ""

WEnd

#cs
Die temporaere Datei beim Speichern ist vorerst notwendig.
Ein anschliessendes Importieren der Daten ist sonst unmoeglich, da hier
Datei-Rechte durcheinander kommen, die verhindern, dass der
Acrobat Reader die Daten wieder lesen kann.
#ce
Func Save($sName, $sType, $iMode)

	$sName = StringReplace($sName, ".pdf", "." & $sType)
	$sTmpFile = _TempFile()

	If $__DEBUG__ Then ConsoleWrite($sTmpFile & @CRLF) EndIf

	$hFile = FileSaveDialog("Save as ...", _
			"::{450D8FBA-AD25-11D0-98A8-0800361B1103}", _ ; MyDocuments
			StringUpper($sType) & " (*." & $sType & ")", _
			16, _
			$sName)

	If Not @error Then
		FileOpen($sTmpFile, $iMode)
		FileWrite($sTmpFile, $xml)
		FileClose($sTmpFile)
		FileCopy($sTmpFile, $hFile)
	EndIf

	FileDelete($sTmpFile)

	If $__DEBUG__ Then ConsoleWrite($sName & @CRLF) EndIf

EndFunc   ;==>Save
