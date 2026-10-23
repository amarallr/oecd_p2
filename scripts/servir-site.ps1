param([int]$Port = 8000)
$ErrorActionPreference = 'Stop'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $nodeExecutable = $nodeCommand.Source }
else { $nodeExecutable = Join-Path $env:ProgramFiles 'RStudio/resources/app/bin/node/node.exe' }
if (-not (Test-Path -LiteralPath $nodeExecutable)) { throw 'Node não encontrado. Instale a versão de .node-version ou configure node no PATH.' }
& $nodeExecutable (Join-Path $PSScriptRoot 'servir-site.cjs') $Port
