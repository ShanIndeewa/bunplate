"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, FileSpreadsheet, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { z } from "zod";

const excelImportSchema = z.object({
  file: z.any().refine((file) => {
    return file && file instanceof File && file.size > 0;
  }, "Please select a valid file"),
});

type ExcelImportData = z.infer<typeof excelImportSchema>;

interface ExcelRow {
  note: string;
  phoneNumber: string;
  whatsappNumber: string;
  rowIndex: number;
  isValid: boolean;
  errors: string[];
}

interface ExcelImportProps {
  onImport: (data: ExcelRow[]) => void;
  onCancel: () => void;
}

export function ExcelImport({ onImport, onCancel }: ExcelImportProps) {
  const [parsedData, setParsedData] = useState<ExcelRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<ExcelImportData>({
    resolver: zodResolver(excelImportSchema) as any,
  });

  const file = watch("file");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setValue("file", selectedFile);
      trigger("file"); // Trigger validation
    }
  };

  const parseExcelFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length < 2) {
        throw new Error("Excel file must have at least a header row and one data row");
      }

      // Get headers and find column indices
      const headers = jsonData[0] as string[];
      const noteIndex = headers.findIndex(h =>
        h?.toLowerCase().includes("note") || h?.toLowerCase().includes("message") || h?.toLowerCase().includes("description")
      );
      const phoneIndex = headers.findIndex(h =>
        h?.toLowerCase().includes("phone") && !h?.toLowerCase().includes("whatsapp")
      );
      const whatsappIndex = headers.findIndex(h =>
        h?.toLowerCase().includes("whatsapp") || h?.toLowerCase().includes("whats")
      );

      if (noteIndex === -1 || phoneIndex === -1 || whatsappIndex === -1) {
        throw new Error(
          `Excel file must contain columns for:
          - Note/Message/Description (found: ${headers[noteIndex] || "missing"})
          - Phone Number (found: ${headers[phoneIndex] || "missing"})
          - WhatsApp Number (found: ${headers[whatsappIndex] || "missing"})`
        );
      }

      // Parse data rows
      const parsedRows: ExcelRow[] = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        const note = String(row[noteIndex] || "").trim();
        const phoneNumber = String(row[phoneIndex] || "").trim();
        const whatsappNumber = String(row[whatsappIndex] || "").trim();

        const errors: string[] = [];
        if (!note) errors.push("Note is required");
        if (!phoneNumber) errors.push("Phone number is required");
        if (!whatsappNumber) errors.push("WhatsApp number is required");

        // Basic phone number validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ""))) {
          errors.push("Invalid phone number format");
        }
        if (whatsappNumber && !phoneRegex.test(whatsappNumber.replace(/[\s\-\(\)]/g, ""))) {
          errors.push("Invalid WhatsApp number format");
        }

        parsedRows.push({
          note,
          phoneNumber,
          whatsappNumber,
          rowIndex: i + 1,
          isValid: errors.length === 0,
          errors,
        });
      }

      setParsedData(parsedRows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse Excel file");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const onSubmit = async (data: ExcelImportData) => {
    if (data.file && data.file instanceof File) {
      await parseExcelFile(data.file);
    }
  };

  const handleImport = () => {
    const validData = parsedData.filter(row => row.isValid);
    onImport(validData);
  };

  const validRows = parsedData.filter(row => row.isValid);
  const invalidRows = parsedData.filter(row => !row.isValid);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Import Bulk Messages from Excel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!parsedData.length ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Excel File</h3>
              <p className="text-gray-600 mb-4">
                Upload an Excel file (.xlsx) with columns for Note, Phone Number, and WhatsApp Number
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Excel File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {file && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Selected: {file.name}
                    </p>
                  )}
                  {errors.file && (
                    <p className="text-sm text-destructive">{errors.file.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button type="submit" disabled={isProcessing || !file}>
                    {isProcessing ? "Processing..." : "Parse File"}
                  </Button>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Excel File Format Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• First row should contain headers</li>
                <li>• Required columns: Note/Message/Description, Phone Number, WhatsApp Number</li>
                <li>• Phone numbers should be in international format (e.g., +1234567890)</li>
                <li>• Supported formats: .xlsx, .xls</li>
              </ul>
              <div className="mt-3">
                <a
                  href="/bulk-message-template.xlsx"
                  download
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Download Excel Template
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{validRows.length} valid rows</span>
                </div>
                {invalidRows.length > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{invalidRows.length} invalid rows</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleImport} disabled={validRows.length === 0}>
                  Import {validRows.length} Messages
                </Button>
                <Button variant="outline" onClick={() => setParsedData([])}>
                  Upload Different File
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {parsedData.length > 0 && (
              <div className="border rounded-lg">
                <div className="max-h-96 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Row</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>WhatsApp Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Errors</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedData.map((row, index) => (
                        <TableRow key={index} className={row.isValid ? "" : "bg-red-50"}>
                          <TableCell>{row.rowIndex}</TableCell>
                          <TableCell className="max-w-xs truncate">{row.note}</TableCell>
                          <TableCell>{row.phoneNumber}</TableCell>
                          <TableCell>{row.whatsappNumber}</TableCell>
                          <TableCell>
                            {row.isValid ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-xs">Valid</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600">
                                <X className="h-4 w-4" />
                                <span className="text-xs">Invalid</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.errors.length > 0 && (
                              <div className="text-xs text-red-600">
                                {row.errors.join(", ")}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
