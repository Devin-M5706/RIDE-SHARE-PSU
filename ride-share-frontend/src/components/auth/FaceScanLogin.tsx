import FaceIcon from '@mui/icons-material/Face';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';

interface FaceScanLoginProps {
  onSuccess: (credential: PublicKeyCredential) => void;
  onError: (error: Error) => void;
}

const FaceScanLogin: React.FC<FaceScanLoginProps> = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startFaceScan = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error('Face authentication is not supported in this browser');
      }

      // Check if platform authenticator is available
      const isPlatformAuthenticatorAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isPlatformAuthenticatorAvailable) {
        throw new Error('Face authentication is not available on this device');
      }

      // Create credential options
      const credentialOptions: CredentialCreationOptions = {
        publicKey: {
          rp: {
            name: 'Drivu',
            id: window.location.hostname,
          },
          user: {
            id: new Uint8Array(16),
            name: 'user@example.com',
            displayName: 'User',
          },
          challenge: new Uint8Array(32),
          pubKeyCredParams: [
            {
              type: 'public-key',
              alg: -7, // ES256
            },
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
          timeout: 60000,
          attestation: 'none',
        },
      };

      // Create credential
      const credential = await navigator.credentials.create(credentialOptions);
      
      if (credential instanceof PublicKeyCredential) {
        onSuccess(credential);
      } else {
        throw new Error('Invalid credential type');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      onError(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Face Scan Login
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={isLoading ? <CircularProgress size={20} /> : <FaceIcon />}
        onClick={startFaceScan}
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Scanning...' : 'Start Face Scan'}
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Use your device's face recognition to log in securely
      </Typography>
    </Box>
  );
};

export default FaceScanLogin; 