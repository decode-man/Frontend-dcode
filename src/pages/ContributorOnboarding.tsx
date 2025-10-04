import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { GitBranch, Users, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ContributorOnboarding: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'contributed' | 'not-contributed' | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedOption === 'contributed') {
      navigate('/contributor/contributed-repos');
    } else if (selectedOption === 'not-contributed') {
      navigate('/contributor/my-repos');
    }
  };

  const options = [
    {
      value: 'contributed' as const,
      title: 'I have contributed before',
      description: 'I have experience contributing to open source projects',
      icon: GitBranch,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      value: 'not-contributed' as const,
      title: 'I haven\'t contributed before',
      description: 'I\'m new to open source contributions',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Welcome, {user?.name || user?.login}!</h1>
                <p className="text-sm text-gray-600">Contributor</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Let's get you started</CardTitle>
            <CardDescription className="text-lg">
              Help us understand your open source contribution experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOption === option.value;
                
                return (
                  <div
                    key={option.value}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? `${option.borderColor} ${option.bgColor}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isSelected ? option.bgColor : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isSelected ? option.color : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{option.title}</h3>
                          {isSelected && (
                            <Badge variant="default">Selected</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                        isSelected
                          ? `${option.borderColor.replace('border-', 'border-')} bg-current`
                          : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleContinue}
                disabled={!selectedOption}
                className="w-full"
                size="lg"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributorOnboarding;