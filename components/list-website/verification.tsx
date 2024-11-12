'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Check, Download, Globe } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VerificationProps {
  websiteUrl: string;
  onVerificationComplete: () => void;
}

export function WebsiteVerification({ websiteUrl, onVerificationComplete }: VerificationProps) {
  const { toast } = useToast();
  const [verificationCode] = useState(`imagelink-${Math.random().toString(36).substring(2, 15)}`);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'meta' | 'file'>('meta');
  const [copied, setCopied] = useState(false);

  const copyVerificationCode = async () => {
    try {
      await navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      toast({
        title: "Copied",
        description: "Verification code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadVerificationFile = () => {
    const element = document.createElement('a');
    const fileContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ImageLink Verification</title>
        </head>
        <body>
          ${verificationCode}
        </body>
      </html>
    `;
    const file = new Blob([fileContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'imagelink-verify.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const verifyWebsite = async () => {
    if (!websiteUrl) return;

    setIsVerifying(true);
    try {
      const response = await fetch('/api/verify-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: websiteUrl,
          code: verificationCode,
          method: verificationMethod,
        }),
      });

      const data = await response.json();
      if (data.verified) {
        toast({
          title: "Success",
          description: "Website ownership verified successfully!",
        });
        onVerificationComplete();
      } else {
        throw new Error(data.error || 'Verification failed');
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Please make sure you've added the verification code correctly",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="meta" onValueChange={(value) => setVerificationMethod(value as 'meta' | 'file')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meta">Meta Tag Method</TabsTrigger>
          <TabsTrigger value="file">HTML File Method</TabsTrigger>
        </TabsList>

        <TabsContent value="meta" className="space-y-4">
          <Alert>
            <AlertDescription>
              Add the following meta tag to your website's <code>&lt;head&gt;</code> section:
              <pre className="mt-2 bg-secondary p-2 rounded-md overflow-x-auto">
                <code>{`<meta name="imagelink-verify" content="${verificationCode}" />`}</code>
              </pre>
              <Button
                onClick={copyVerificationCode}
                variant="outline"
                className="mt-2"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : null}
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <Alert>
            <AlertDescription className="space-y-4">
              <p>Download and upload the verification file to your website's root directory:</p>
              <Button onClick={downloadVerificationFile} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Verification File
              </Button>
              <p className="text-sm text-muted-foreground">
                Upload the file to: {websiteUrl}/imagelink-verify.html
              </p>
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={verifyWebsite}
          disabled={isVerifying}
          className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white hover:opacity-90"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Verify Ownership
            </>
          )}
        </Button>
      </div>
    </div>
  );
}