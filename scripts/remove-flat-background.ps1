param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath,
  [int]$Tolerance = 24
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath).Path)
$bounds = [System.Drawing.Rectangle]::new(0, 0, $source.Width, $source.Height)
$image = $source.Clone($bounds, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$source.Dispose()

$width = $image.Width
$height = $image.Height
$corners = @(
  $image.GetPixel(0, 0),
  $image.GetPixel($width - 1, 0),
  $image.GetPixel(0, $height - 1),
  $image.GetPixel($width - 1, $height - 1)
)
$backgroundR = [int](($corners | Measure-Object R -Average).Average)
$backgroundG = [int](($corners | Measure-Object G -Average).Average)
$backgroundB = [int](($corners | Measure-Object B -Average).Average)
$limit = $Tolerance * $Tolerance
# The exported Figma frame has a uniform #101010 canvas. Remove only pixels
# close to that canvas colour, keeping the original book, page edges and shadow.
for ($y = 0; $y -lt $height; $y++) {
  for ($x = 0; $x -lt $width; $x++) {
    $color = $image.GetPixel($x, $y)
    $dr = $color.R - $backgroundR
    $dg = $color.G - $backgroundG
    $db = $color.B - $backgroundB
    $distance = $dr * $dr + $dg * $dg + $db * $db

    if ($distance -le $limit) {
      $image.SetPixel(
        $x,
        $y,
        [System.Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B)
      )
    }
  }
}

$image.Save([System.IO.Path]::GetFullPath($OutputPath), [System.Drawing.Imaging.ImageFormat]::Png)
$image.Dispose()
