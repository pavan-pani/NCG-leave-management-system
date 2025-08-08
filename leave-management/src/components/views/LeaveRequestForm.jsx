import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LEAVE_TYPES } from '../../utils/constants';
import { validateLeaveForm } from '../../utils/validation';
import { getDaysCount, getTodayDate } from '../../utils/helpers';
import ErrorMessage from '../common/ErrorMessage';

const LeaveRequestForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateLeaveForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await onSubmit(formData);
      if (!result.success) {
        setErrors(result.errors || { submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const today = getTodayDate();
  const duration = formData.startDate && formData.endDate 
    ? getDaysCount(formData.startDate, formData.endDate) 
    : 0;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Leave Request Form</CardTitle>
        <CardDescription>Please fill in all the required details</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {errors.submit && <ErrorMessage message={errors.submit} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type *</Label>
              <Select value={formData.leaveType} onValueChange={(value) => handleChange('leaveType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {LEAVE_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.leaveType && <p className="text-sm text-red-600">{errors.leaveType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                min={today}
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
              {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                min={formData.startDate || today}
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
              />
              {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md border">
                {duration > 0 
                  ? `${duration} day${duration > 1 ? 's' : ''}`
                  : 'Select dates to see duration'
                }
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              placeholder="Please provide the reason for your leave..."
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              rows={4}
            />
            {errors.reason && <p className="text-sm text-red-600">{errors.reason}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting || loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LeaveRequestForm;