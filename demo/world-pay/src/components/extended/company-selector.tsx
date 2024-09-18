import { Label } from '../ui/label';
import { useAuthenticationContext } from '@/context/authentication';
import { CompanyA, CompanyB } from '@/types/company';
import { RadioGroup, RadioGroupItem } from '../ui/radio-select';
import { useNavigate } from 'react-router-dom';

const CompanySelector = () => {
  const { company, setCompany } = useAuthenticationContext();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setCompany(value === CompanyA.referenceId ? CompanyA : CompanyB);
    navigate('/');
  };

  return (
    <RadioGroup value={company.referenceId} onValueChange={handleChange}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={CompanyA.referenceId}
          id={CompanyA.referenceId}
        />
        <Label htmlFor={CompanyA.referenceId}>Company A</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={CompanyB.referenceId}
          id={CompanyB.referenceId}
        />
        <Label htmlFor={CompanyB.referenceId}>Company B</Label>
      </div>
    </RadioGroup>
  );
};

export default CompanySelector;
