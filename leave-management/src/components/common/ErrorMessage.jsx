import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { XCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  variant = 'destructive' 
}) => {
  return (
    <Alert variant={variant} className="my-4">
      <XCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="ml-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;