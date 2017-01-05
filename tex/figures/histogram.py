import numpy as np
import matplotlib.pyplot as plt

mu, sigma = 0., 1.
data = np.random.normal(mu, sigma, 10000)
count, bins, ignored = plt.hist(data, 50, normed=True)
plt.xlabel(r'$\Delta x$')
plt.ylabel(r'Wahrscheinlichkeit')
plt.plot(bins, 1/(sigma*np.sqrt(2*np.pi))*np.exp(-(bins - mu)**2/(2*sigma**2)),
         linewidth=2, color='r')
plt.xlim(-4., 4.)
plt.savefig('histogram.pdf', dpi=600)
